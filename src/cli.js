import fs from "fs";
import startPipeline from "./main.js";
import { getLastStatus, getLogs } from "../db/dbService.js";

const command = process.argv[2]

async function runCLI(){
    switch(command){
        case "run":
            console.log("Starting the pipeline...\n");
            await startPipeline();
        break;
        case "status":
            const dbstatus = await getLastStatus();
            console.log("Pipeline Status:", dbstatus);
            if(fs.existsSync("pipeline_status.json")){
                const status = JSON.parse(
                    fs.readFileSync("pipeline_status.json")
                );

                console.log("Pipeline Status : \n")
                console.log(status)
                
            }
            else{
                console.log("No Pipeline status available");
            }
            break;

            case "logs":
                const dblogs = await getLogs();
                console.log(dblogs);
                if(fs.existsSync("execution.log")){
                    const logs = fs.readFileSync("execution.log","utf-8");
                    console.log("\nExecution logs : \n");
                    console.log(logs);
                }
                else{
                    console.log("No Logs found!!")
               }
                break;
               default:
                console.log(`Resilient CI/CD CLI 

        Commands Available : 
        node src/cli.js run  -> Run Pipeline
        node src/cli.js status -> Show Pipeline Status
        node src/cli.js logs -> Show Execution logs`
                
                );

    
            }
    
}

runCLI();