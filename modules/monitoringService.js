// BUG: writeFileSync blocks and has no error handling
// FIX: async write with try/catch
import { writeFile } from "fs";

export default class MonitoringService {
  constructor(file = "pipeline_status.json") {
    this.file = file;
  }

  trackStatus(status) {
    const data = { status, updatedAt: new Date().toISOString() };

    writeFile(this.file, JSON.stringify(data, null, 2), (err) => { // FIX: async
      if (err) console.error("MonitoringService write error:", err);
    });
  }
}