// BUG: const/let inside switch cases without braces causes a ReferenceError
// in some JS engines because the variable is technically in-scope for the
// whole switch but not initialised. FIX: wrap each case in braces { }
import fs from "fs";
import startPipeline from "./main.js";
import { getLastStatus, getLogs } from "../db/dbService.js";

const command = process.argv[2];

async function runCLI() {
  switch (command) {
    case "run": {
      console.log("Starting the pipeline...\n");
      await startPipeline();
      break;
    }

    case "status": {                                    // FIX: braces around case body
      const dbstatus = await getLastStatus();
      console.log("Pipeline Status (DB):", dbstatus);

      if (fs.existsSync("pipeline_status.json")) {
        const status = JSON.parse(fs.readFileSync("pipeline_status.json"));
        console.log("Pipeline Status (file):\n", status);
      } else {
        console.log("No pipeline status file available");
      }
      break;
    }

    case "logs": {                                      // FIX: braces around case body
      const dblogs = await getLogs();
      console.log("DB Logs:", dblogs);

      if (fs.existsSync("execution.log")) {
        const logs = fs.readFileSync("execution.log", "utf-8");
        console.log("\nExecution logs:\n", logs);
      } else {
        console.log("No log file found.");
      }
      break;
    }

    default: {
      console.log(`Resilient CI/CD CLI

Commands:
  node src/cli.js run    → Run pipeline
  node src/cli.js status → Show pipeline status
  node src/cli.js logs   → Show execution logs`);
    }
  }
}

runCLI();