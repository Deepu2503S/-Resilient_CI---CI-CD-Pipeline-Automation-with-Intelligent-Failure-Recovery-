// BUG: appPath is interpolated directly into a shell command string
// If appPath = "foo.py; rm -rf /", that command runs.
// FIX: use execFile with an args array — never interpolate user/config values into shell strings
import { execFile } from "child_process";  // FIX: execFile instead of exec

export default class CICDExecution {
  constructor(appPath, runtime = "python") {
    this.appPath = appPath;
    this.runtime = runtime;
  }

  async runPipeline() {
    console.log("Running CI/CD pipeline...");

    // FIX: pass binary and args separately — no shell interpolation
    const [bin, ...args] =
      this.runtime === "python"
        ? ["python", this.appPath]
        : ["node", this.appPath];

    return new Promise((resolve) => {
      execFile(bin, args, (error, stdout, stderr) => {
        if (error) {
          resolve({ status: "FAILURE", error: stderr || error.message });
        } else {
          resolve({ status: "SUCCESS", output: stdout });
        }
      });
    });
  }
}