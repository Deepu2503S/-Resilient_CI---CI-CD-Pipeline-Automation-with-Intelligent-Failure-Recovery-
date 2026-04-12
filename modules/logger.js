// BUG: appendFileSync blocks the Node event loop on every log call
// FIX: use the async fs.appendFile with a callback (or fs/promises)
import { appendFile } from "fs";

export default class Logger {
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] : ${message}\n`;

    appendFile("execution.log", logMessage, (err) => {   // FIX: async version
      if (err) console.error("Logger write error:", err);
    });
  }
}