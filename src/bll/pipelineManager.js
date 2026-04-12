import { savePipelineRun, saveLog } from "../../db/dbService.js";

export default async function executePipeline({
  pipeline, classifier, recovery, notification, logger, monitor
}) {
  if (!pipeline) throw new Error("Pipeline not initiated!");

  logger.log("Pipeline Started");
  await saveLog("Pipeline Started");
  monitor.trackStatus("RUNNING");

  const result = await pipeline.runPipeline();

  if (result.status === "FAILURE") {
    const failureType = await Promise.resolve(classifier.classify(result.error));

    monitor.trackStatus("FAILED");
    logger.log(`Failure Detected : ${failureType}`);
    await saveLog(`Failure Detected : ${failureType}`, "ERROR");

    const recoveryAction = recovery.recover(failureType);
    logger.log(`Recovery action : ${recoveryAction}`);
    await saveLog(`Recovery Action : ${recoveryAction}`);

    await notification.sendNotification(
`CI/CD Pipeline Failed

Error Detected  : ${result.error}
Failure Type    : ${failureType}
Recovery Action : ${recoveryAction}`
    );

    await savePipelineRun("FAILED", failureType, recoveryAction);
    return { status: "FAILED", failureType, recoveryAction };

  } else {
    monitor.trackStatus("SUCCESS");
    logger.log("Pipeline Successful!");
    await saveLog("Pipeline Successful!");

    await notification.sendNotification(
`CI/CD Pipeline Succeeded

Status : All steps completed successfully
Output : ${result.output}`
    );

    await savePipelineRun("SUCCESS", null, null);
    return { status: "SUCCESS", output: result.output };
  }
}