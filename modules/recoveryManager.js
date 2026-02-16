export default class RecoverManager{
    recover(failureType){
        console.log("Initiating recovery module...");

        switch(failureType){
            case "LOGIC_ERROR":
                return "Manual Fix Require!";
            
            case "DEPENDENCY_ERROR":
                return "Reinstalling the dependencies and retrying build";
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