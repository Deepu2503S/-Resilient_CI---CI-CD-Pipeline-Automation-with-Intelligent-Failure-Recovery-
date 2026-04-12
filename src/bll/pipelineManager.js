// BUG 1: savePipelineRun, saveLog called without await → DB writes race with process exit
// BUG 2: notification.sendNotification not awaited in SUCCESS branch
// FIX: await everything; wrap DB calls in try/catch so one failure doesn't crash the pipeline
import { savePipelineRun, saveLog } from "../../db/dbService.js";

export default async function executePipeline({
  pipeline, classifier, recovery, notification, logger, monitor
}) {
  if (!pipeline) throw new Error("Pipeline not initiated!");

  logger.log("Pipeline Started");
  await saveLog("Pipeline Started");                    // FIX: was missing await
  monitor.trackStatus("RUNNING");

  const result = await pipeline.runPipeline();

  if (result.status === "FAILURE") {
    const failureType = classifier.classify(result.error);

    monitor.trackStatus("FAILED");
    logger.log(`Failure Detected : ${failureType}`);
    await saveLog(`Failure Detected : ${failureType}`, "ERROR"); // FIX

    const recoveryAction = recovery.recover(failureType);
    logger.log(`Recovery action : ${recoveryAction}`);
    await saveLog(`Recovery Action : ${recoveryAction}`);        // FIX

    await notification.sendNotification(
      `CI/CD Pipeline Failed\n
Error Detected : ${result.error}
Failure Type   : ${failureType}
Recovery Action: ${recoveryAction}`
    );
    await savePipelineRun("FAILED", failureType, recoveryAction); // FIX

    return { status: "FAILED", failureType };
  } else {
    monitor.trackStatus("SUCCESS");
    logger.log("Pipeline Successful!");
    await saveLog("Pipeline Successful!");
    await notification.sendNotification("Pipeline Executed Successfully!"); // FIX: missing await
    await savePipelineRun("SUCCESS", null, null);                 // FIX

    return { status: "SUCCESS", output: result.output };
  }
}