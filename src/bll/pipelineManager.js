import { savePipelineRun, saveLog } from "../../db/dbService.js";

function extractErrorLocation(err) {
  if (err && err.line) return `Line ${err.line}`;

  if (err && err.stack) {
    const stackLines = err.stack.split('\n');
    return stackLines.length > 1 ? stackLines[1].trim() : "Location not found in stack";
  }

  if (typeof err === 'string') {
    // 1. Check for Python stack traces (e.g., File "app.py", line 11)
    const pythonMatch = err.match(/File "([^"]+)", line (\d+)/);
    if (pythonMatch) return `${pythonMatch[1]} (Line ${pythonMatch[2]})`;

    // 2. Check for standard Node/C++/Java stack traces (e.g., app.js:11:5)
    const nodeMatch = err.match(/([\w.\-/\\:]+:\d+(?::\d+)?)/);
    if (nodeMatch) return nodeMatch[1];
    
    return "No line number provided in error log"; 
  }

  return "Unknown location";
}

export default async function executePipeline({
  pipeline, classifier, recovery, notification, logger, monitor
}) {
  if (!pipeline) throw new Error("Pipeline not initiated!");

  logger.log("Pipeline Started");
  await saveLog("Pipeline Started");
  monitor.trackStatus("RUNNING");

  const result = await pipeline.runPipeline();

  if (result.status === "FAILURE") {
    const errors = result.errors && result.errors.length > 0
      ? result.errors
      : [result.error];

    console.log(`[Pipeline] ${errors.length} error(s) detected`);

    const classifications = [];

    for (const err of errors) {
      const failureType    = await Promise.resolve(classifier.classify(err));
      const recoveryAction = recovery.recover(failureType);

      classifications.push({ error: err, failureType, recoveryAction });

      logger.log(`Failure: ${failureType} | Recovery: ${recoveryAction}`);
      await saveLog(`Failure Detected : ${failureType}`, "ERROR");
      await saveLog(`Recovery Action  : ${recoveryAction}`);
      await savePipelineRun("FAILED", failureType, recoveryAction);
    }

    monitor.trackStatus("FAILED");

    const emailBody = classifications.map((c, i) =>
`Error ${i + 1}:
  Location      : ${extractErrorLocation(c.error)}
  Failure Type  : ${c.failureType}
  Recovery      : ${c.recoveryAction}`
    ).join("\n\n");

    await notification.sendNotification(
`CI/CD Pipeline Failed — ${classifications.length} error(s) detected
${emailBody}`
    );

    return { status: "FAILED", classifications };

  } else {
    monitor.trackStatus("SUCCESS");
    logger.log("Pipeline Successful!");
    await saveLog("Pipeline Successful!");

    await notification.sendNotification(
` CI/CD Pipeline Succeeded

Status : All steps completed successfully
Output : ${result.output}`
    );
    console.log("Pipeline executed successfully with no Error!")
    await savePipelineRun("SUCCESS", null, null);
    return { status: "SUCCESS", output: result.output };
  }
}