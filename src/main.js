import CICDExecution from "../modules/cicdexecution.js";
import FailureClassifier from "../modules/failureclassifier.js";
import RecoverManager from "../modules/recoveryManager.js";
import NotificationService from "../modules/notificationService.js";
import Logger from "../modules/logger.js";
import MonitoringService from "../modules/monitoringService.js";
import dotenv from "dotenv";
import { savePipelineRun, saveLog } from "./db/dbService.js";

dotenv.config();


const pipeline = new CICDExecution("app.js")
const classsifier = new FailureClassifier()
const recovery = new RecoverManager()
const logger = new Logger()
const notification = new NotificationService()
const monitor = new MonitoringService()



export default async function startPipeline(){
    logger.log("Pipeline started..")
    monitor.trackStatus("RUNNING")
    saveLog("Pipeline started");

    const result = await pipeline.runPipeline()

    if(result.status==="FAILURE"){
        const failureType = classsifier.classify(result.error)
        monitor.trackStatus("FAILED")
        logger.log(`Failure detected ${failureType}`)
        const recoveryAction = recovery.recover(failureType);
        logger.log(`Recovery action : ${recoveryAction}`)
        savePipelineRun("FAILURE", failureType, recoveryAction);

       await notification.sendNotification(`Pipeline failed due to ${failureType}`)
        logger.log(`Notification sent for failure detection of ${failureType}`)

    }
    else{
        monitor.trackStatus("SUCCESS")
        logger.log("Pipeline Successfull")
        await notification.sendNotification("Pipeline executed successfully");
        logger.log("Notification of pipeline success sent!")
        savePipelineRun("SUCCESS", null, null);
    }

    
}