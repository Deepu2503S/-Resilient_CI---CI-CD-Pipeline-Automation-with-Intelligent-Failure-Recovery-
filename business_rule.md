 1. Overview

Business rules define how the system behaves during pipeline execution.

These rules are implemented in pipelineManager.js.

---
 2. Business Rules
(A) Pipeline Execution Rule

The pipeline is executed and result is SUCCESS or FAILURE.
const result = await pipeline.runPipeline();

---

(B) Failure Classification Rule

If pipeline fails, classify error.

if (result.status === "FAILURE") {
  const failureType = classifier.classify(result.error);
}

---
(C) Recovery Rule

Perform recovery based on failure type.

const recoveryAction = recovery.recover(failureType);

---
(D) Logging Rule

Log all important events.

logger.log("Pipeline Started");
saveLog("Pipeline Started");

---
(E) Notification Rule

Notify user after execution.

await notification.sendNotification(`Pipeline failed due to : ${failureType}`);

---
(F) Database Storage Rule

Store pipeline results in database.

savePipelineRun("FAILED", failureType, recoveryAction);


