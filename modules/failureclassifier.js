import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ML_SCRIPT = path.join(__dirname, "../src/ml/mlClassifier.py");

export default class FailureClassifier {
  classify(errorMessage) {
    if (!errorMessage) return "NO_FAILURE";

    const msg = errorMessage.toLowerCase();

   
    if (msg.includes("typeerror") || msg.includes("referenceerror"))
      return "LOGIC_ERROR";
    if (msg.includes("syntaxerror") || msg.includes("indentationerror"))
      return "SYNTAX_ERROR";
    if (msg.includes("enoent") || msg.includes("module not found") || msg.includes("cannot find"))
      return "DEPENDENCY_ERROR";
    if (msg.includes("permission denied") || msg.includes("access denied"))
      return "ENVIRONMENT_ERROR";
    if (msg.includes("timeout") || msg.includes("etimedout"))
      return "TIMEOUT_ERROR";

   
    return this.mlClassify(errorMessage);
  }

  mlClassify(errorMessage) {
    return new Promise((resolve) => {
      console.log("[ML] Error not rule-matched, sending to ML model...");

      execFile(
        "python",
        [ML_SCRIPT, "predict", errorMessage],
        (error, stdout, stderr) => {
          if (error) {
            console.error("[ML] ML model failed:", stderr || error.message);
            resolve("ML_CLASSIFIED_FAILURE");
            return;
          }

          const result = stdout.trim();
          console.log(`[ML] Model classified as: ${result}`);
          resolve(result);
        }
      );
    });
  }
}