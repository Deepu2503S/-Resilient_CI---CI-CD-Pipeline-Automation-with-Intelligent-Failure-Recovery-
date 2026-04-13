------------------------------------------------------------

Bug ID: BUG01

Description:
Pipeline execution result not awaited, causing incomplete execution flow.

Steps to Reproduce:
1. Run: node src/cli.js run
2. Observe logs

Expected Result:
Pipeline should execute completely and return correct status.

Actual Result:
Execution stops midway or behaves inconsistently.

Severity:
High

Suggested Fix:
Use "await executePipeline(dep)" in main.js.

------------------------------------------------------------

Bug ID: BUG02

Description:
FailureClassifier does not handle unknown errors properly before ML fallback.

Steps to Reproduce:
1. Trigger unknown error in app.py
2. Run pipeline

Expected Result:
Error should be classified correctly or handled gracefully.

Actual Result:
Always returns "ML_CLASSIFIED_FAILURE" without meaningful classification.

Severity:
Medium

Suggested Fix:
Improve rule-based checks before ML fallback and expand dataset.

------------------------------------------------------------

Bug ID: BUG03

Description:
Incorrect file path for Python script leads to pipeline failure.

Steps to Reproduce:
1. Set path as "app.py" instead of "src/app.py"
2. Run pipeline

Expected Result:
Python script should execute successfully.

Actual Result:
Script not found or execution fails.

Severity:
High

Suggested Fix:
Provide correct relative path based on project structure.

------------------------------------------------------------

Bug ID: BUG04

Description:
Database logging fails silently when connection is lost.

Steps to Reproduce:
1. Stop MySQL server
2. Run pipeline

Expected Result:
Error should be handled and logged properly.

Actual Result:
Logs not saved and error handling is weak.

Severity:
Medium

Suggested Fix:
Add proper error handling and retry mechanism in dbService.js.

------------------------------------------------------------

Bug ID: BUG05

Description:
CLI does not validate user input commands properly.

Steps to Reproduce:
1. Run: node src/cli.js invalidCommand

Expected Result:
Proper error message or usage guide displayed.

Actual Result:
Generic output without clear error handling.

Severity:
Low

Suggested Fix:
Add validation and descriptive error messages for invalid commands.

------------------------------------------------------------