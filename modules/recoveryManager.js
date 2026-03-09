import { execSync } from "child_process"
export default class RecoverManager{
    recover(failureType){
        console.log("Initiating recovery module...");

        switch(failureType){
            case "LOGIC_ERROR":
                return "Manual Fix Require!";
            
            case "DEPENDENCY_ERROR":
                try{
                    execSync("npm install",{ stdio : "inherit"});
                    return "Dependencies reinstalled successfully";

                }
                catch(error){
                    return "Failed to reinstall dependencies";
                }
            case "TIMEOUT_ERROR":
                return "Restarting pipeline due to Timeout";

            case "ENVIORNMENT_ERROR":
                return "Checking Enviornment configuration";
            case "SYNTAX_ERROR":
                return "Manual Recovery required in syntax";

            default :
                return "Unknown Failure.Escalated to DevOps";
        }

     }

}