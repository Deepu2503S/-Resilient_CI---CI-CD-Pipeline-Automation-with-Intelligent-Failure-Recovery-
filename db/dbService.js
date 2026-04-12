// BUG: savePipelineRun and saveLog used callbacks but were called with await
// FIX: wrap all db.query calls in Promises so await actually works
import db from "./db.js";

export function savePipelineRun(status, failureType, recoveryAction) {
  return new Promise((resolve, reject) => {            // FIX: was callback, not a Promise
    const query = `
      INSERT INTO pipeline_runs (status, failure_type, recovery_action)
      VALUES (?, ?, ?)
    `;
    db.query(query, [status, failureType, recoveryAction], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export function saveLog(message, level = "INFO") {
  return new Promise((resolve, reject) => {            // FIX: same issue
    const query = `INSERT INTO logs (message, level) VALUES (?, ?)`;
    db.query(query, [message, level], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export function getLastStatus() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT status FROM pipeline_runs ORDER BY id DESC LIMIT 1",
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]?.status || "UNKNOWN");
      }
    );
  });
}

export function getLogs() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM logs ORDER BY created_at DESC LIMIT 10",
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
}