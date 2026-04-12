import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ML_SCRIPT = path.join(__dirname, "../src/ml/mlClassifier.py");

export default class FailureClassifier {
  
  // Extract just the important last line from Python tracebacks
  extractErrorLine(errorMessage) {
    if (!errorMessage) return "";
    
    const lines = errorMessage.trim().split("\n").map(l => l.trim()).filter(Boolean);
    // Last line of a Python traceback is always the actual error e.g. "TypeError: ..."
    return lines[lines.length - 1] || errorMessage;
  }

  classify(errorMessage) {
    if (!errorMessage) return "NO_FAILURE";

    const lastLine = this.extractErrorLine(errorMessage);
    const msg = lastLine.toLowerCase();

    console.log(`[Classifier] Classifying: "${lastLine}"`);

    if (msg.includes("typeerror") || msg.includes("referenceerror") || msg.includes("attributeerror") || msg.includes("valueerror"))
      return "LOGIC_ERROR";
    if (msg.includes("syntaxerror") || msg.includes("indentationerror"))
      return "SYNTAX_ERROR";
    if (msg.includes("modulenotfounderror") || msg.includes("importerror") || msg.includes("module not found") || msg.includes("enoent") || msg.includes("cannot find"))
      return "DEPENDENCY_ERROR";
    if (msg.includes("permissionerror") || msg.includes("permission denied") || msg.includes("access denied"))
      return "ENVIRONMENT_ERROR";
    if (msg.includes("timeouterror") || msg.includes("timeout") || msg.includes("etimedout"))
      return "TIMEOUT_ERROR";

    // Only send to ML if rule-based truly can't classify it
    return this.mlClassify(lastLine);
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