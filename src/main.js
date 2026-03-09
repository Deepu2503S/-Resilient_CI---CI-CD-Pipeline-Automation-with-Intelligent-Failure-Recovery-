import CICDExecution from "../modules/cicdexecution";
import FailureClassifier from "../modules/failureclassifier";
import RecoverManager from "../modules/recoveryManager";
import NotificationService from "../modules/notificationService";
import Logger from "../modules/logger";
import dotenv from "dotenv";
dotenv.config();


const pipeline = new CICDExecution("app.js")
const classsifier = new FailureClassifier()
const recovery = new RecoverManager()
const logger = new Logger()
const notification = new NotificationService()


async function startPipeline(){
    logger.log("Pipeline started..")

    const result = await pipeline.runPipeline()

    if(result.status==="FAILURE"){
        const failureType = classsifier.classify(result.error)
        logger.log(`Failure detected ${failureType}`)
        const recoveryAction = recovery.recover(failureType);
        logger.log(`Recovery action : ${recoveryAction}`)

        notification.sendNotification(`Pipeline failed due to ${failureType}`)
        logger.log(`Notification sent for failure detection of ${failureType}`)

    }
    else{
        logger.log("Pipeline Successfull")
        notification.sendNotification("Pipeline executed successfully")
        logger.log("Notification of pipeline success sent!")
    }

    
}

startPipeline()