import db from "./db.js";

export function savePipelineRun(status, failureType, recoveryAction) {
  const query = `
    INSERT INTO pipeline_runs (status, failure_type, recovery_action)
    VALUES (?, ?, ?)
  `;

  db.query(query, [status, failureType, recoveryAction], (err) => {
    if (err) console.error("DB Error:", err);
  });
}

export function saveLog(message, level = "INFO") {
  const query = `
    INSERT INTO logs (message, level)
    VALUES (?, ?)
  `;

  db.query(query, [message, level], (err) => {
    if (err) console.error("DB Error:", err);
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