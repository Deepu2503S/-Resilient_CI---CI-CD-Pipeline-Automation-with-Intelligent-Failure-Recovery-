import CICDExecution from "../modules/cicdexecution.js";
import FailureClassifier from "../modules/failureclassifier.js";
import RecoverManager from "../modules/recoveryManager.js";
import NotificationService from "../modules/notificationService.js";
import Logger from "../modules/logger.js";
import MonitoringService from "../modules/monitoringService.js";
import dotenv from "dotenv";
import executePipeline from "./bll/pipelineManager.js";

dotenv.config();
import executePipeline from "./bll/pipelineManager.js";


const dep = {
    pipeline : new CICDExecution(app.py),
    classifier : new FailureClassifier(),
    recovery : new RecoverManager(),
    notification : new NotificationService(),
    logger : new Logger(),
    monitor : new MonitoringService()
}

export default async function startPipeline(){
    try {
        
        const result = executePipeline(dep);
        return result;
    } catch (error) {
        console.log("Pipeline Crash",error.message);
        return {
            status : "ERROR",
            error : error.message
        }
        
    }
}