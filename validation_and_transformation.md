 1. Validation Logic

Validation ensures that the data entering the system is correct, complete, and in the proper format before processing.

(A) Pipeline Initialization Validation

Before executing the pipeline, the system checks whether the pipeline object is properly initialized.

if (!pipeline) {
  throw new Error("Pipeline not initiated!");
}

Purpose:
- Prevents execution of undefined pipeline
- Avoids runtime crashes

---
(B) CLI Command Validation

The system reads user commands from the command line.

const command = process.argv[2];

Validation ensures:
- Command is provided
- Command is valid (run, status, logs)

If invalid:
- System shows available commands

---

(C) File Validation

Before reading files such as logs or status, the system checks if the file exists.

if (fs.existsSync("execution.log")) {
}
Purpose:
- Prevents file read errors
- Ensures safe file handling

---

(D) Error Validation

Before processing errors, the system ensures error data is available.

Example:
- Checking if result.error exists before classification

Purpose:
- Prevents undefined error processing
- Ensures accurate failure classification

---

2. Data Transformation

Data transformation converts raw system data into a structured and user-friendly format.

---

(A) Error → Failure Type Transformation

Raw error messages from pipeline execution are converted into meaningful categories.

const failureType = classifier.classify(result.error);

Example:
Raw Error:
"Module not found"

Transformed:
"DEPENDENCY_ERROR"

Purpose:
- Simplifies error understanding
- Enables decision-making for recovery

---
(B) Pipeline Result Transformation

The system converts raw execution results into structured objects.

return {
  status: "FAILED",
  failureType
};

OR

return {
  status: "SUCCESS",
  output: result.output
};

Purpose:
- Standardizes output format
- Makes data easy to use in UI and DB

---

(C) Database → CLI Output Transformation

Data retrieved from the database is formatted for display in CLI.

const dbstatus = await getLastStatus();
console.log("Pipeline Status:", dbstatus);

Purpose:
- Converts database records into readable output
- Improves user experience

---

(D) Logs Transformation

Logs stored in database or files are converted into readable format for display.

const logs = await getLogs();
console.log(logs);

OR

const logs = fs.readFileSync("execution.log", "utf-8");
console.log(logs);

Purpose:
- Makes debugging easier
- Provides meaningful execution history

---
3. Purpose of Validation and Transformation

Validation:
- Ensures correctness of input
- Prevents invalid operations
- Improves system reliability

Data Transformation:
- Converts raw data into meaningful format
- Improves readability
- Supports UI interaction

