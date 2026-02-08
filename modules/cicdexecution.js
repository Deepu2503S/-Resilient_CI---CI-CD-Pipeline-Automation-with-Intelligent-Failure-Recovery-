import { exec } from "child_process";

export default class CICDExecution {
  constructor(appPath, runtime = "python") {
    this.appPath = appPath;
    this.runtime = runtime; 
  }

  async runPipeline() {
    console.log("Running CI/CD pipeline...");

    const command =
      this.runtime === "python"
        ? `python ${this.appPath}`
        : `node ${this.appPath}`;

    return new Promise((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          resolve({
            status: "FAILURE",
            error: stderr || error.message
          });
        } else {
          resolve({
            status: "SUCCESS",
            output: stdout
          });
        }
      });
    });
  }
}
