import { savePipelineRun, saveLog } from "../../db/dbService.js";
export default async function executePipeline({
    pipeline,
    classifier,
    recovery,
    notification,
    logger,
    monitor
}){

    if(!pipeline){
        throw new Error("Pipeline not initiated!");
    }

    logger.log("Pipeline Started");
    saveLog("Pipeline Started")
    monitor.trackStatus("RUNNING");

    const result = await pipeline.runPipeline()
    if(result.status==="FAILURE"){
        const failureType = classifier.classify(result.error)
    
    monitor.trackStatus("FAILED")
    logger.log(`Failure Detected : ${failureType}`);
    saveLog(`Failure Detected : ${failureType}`,"ERROR")
    const recoveryAction = recovery.recover(failureType);
    logger.log(`Recovery action : ${recoveryAction}`)
    saveLog(`Recovery Action : ${recoveryAction}`)
    await notification.sendNotification(`Pipeline failed due to : ${failureType}`)
    
    savePipelineRun("FAILED",failureType,recoveryAction)

    return {
        status : "FAILED",
        failureType
    }}


    else{
        monitor.trackStatus("SUCCESS");
        logger.log("Pipeline Successfull!")
        saveLog("Pipeline Successfull!")
        await notification.sendNotification("Pipeline Executed Succefully!");
        savePipelineRun("SUCCESS",null,null)
        return {
            status : "SUCCESS",
            output : result.output
        }
    }
}