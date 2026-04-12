// BUG: "ENVIORNMENT_ERROR" never matches "ENVIRONMENT_ERROR" from classifier
// FIX: corrected spelling on both the case key and the return string
import { execSync } from "child_process";

export default class RecoverManager {
  recover(failureType) {
    console.log("Initiating recovery module...");

    switch (failureType) {
      case "LOGIC_ERROR":
        return "Manual Fix Required!";

      case "DEPENDENCY_ERROR":
        try {
          execSync("npm install", { stdio: "inherit" });
          return "Dependencies reinstalled successfully";
        } catch (error) {
          return "Failed to reinstall dependencies";
        }

      case "TIMEOUT_ERROR":
        return "Restarting pipeline due to Timeout";

      case "ENVIRONMENT_ERROR":           
        return "Checking Environment configuration"; 

      case "SYNTAX_ERROR":
        return "Manual Recovery required for syntax error";

      default:
        return "Unknown Failure. Escalated to DevOps";
    }
  }
}