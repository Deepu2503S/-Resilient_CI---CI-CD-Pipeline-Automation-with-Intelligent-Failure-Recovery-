import { execFile } from "child_process";

export default class CICDExecution {
  constructor(appPath, runtime = "python") {
    this.appPath = appPath;
    this.runtime = runtime;
  }

  async runPipeline() {
    console.log("Running CI/CD pipeline...");

    const [bin, ...args] =
      this.runtime === "python"
        ? ["python", this.appPath]
        : ["node", this.appPath];

    return new Promise((resolve) => {
      execFile(bin, args, (error, stdout, stderr) => {
        if (error) {
          resolve({
            status: "FAILURE",
            error: stderr || error.message,
            // Parse individual errors from stderr
            errors: this.parseErrors(stderr || error.message)
          });
        } else {
          resolve({ status: "SUCCESS", output: stdout });
        }
      });
    });
  }

  // Split multiple errors into an array
  parseErrors(stderr) {
    if (!stderr) return [];
    return stderr
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.startsWith("[") && l.includes("]")); // matches [test_name] error
  }
}