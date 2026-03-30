White Box Testing is performed by analyzing the internal logic of the system and testing different execution paths in the code.

------------------------------------------------------------

Test Case 1: Pipeline Initialization Validation

Objective:
Verify that the system throws an error when pipeline is not initialized

Input:
pipeline = null

Expected Output:
Error message: "Pipeline not initiated!"

Code Path Covered:
Validation condition (if (!pipeline))

------------------------------------------------------------

Test Case 2: Successful Pipeline Execution

Objective:
Verify execution when pipeline runs successfully

Input:
result.status = "SUCCESS"

Expected Output:
- Status updated to SUCCESS
- Success message logged
- Notification sent
- Return object: { status: "SUCCESS" }

Code Path Covered:
Success (else) branch

------------------------------------------------------------

Test Case 3: Failure Execution Path

Objective:
Verify execution when pipeline fails

Input:
result.status = "FAILURE"

Expected Output:
- Error classified
- Recovery triggered
- Notification sent
- Return object: { status: "FAILED", failureType: "..." }

Code Path Covered:
Failure (if) branch

------------------------------------------------------------

Test Case 4: Syntax Error Classification

Objective:
Verify classification of syntax errors

Input:
error = "SyntaxError: Unexpected token"

Expected Output:
failureType = "SYNTAX_ERROR"

Code Path Covered:
Classifier condition for syntax error

------------------------------------------------------------

Test Case 5: Dependency Error Handling

Objective:
Verify dependency failure detection and recovery

Input:
error = "MODULE_NOT_FOUND"

Expected Output:
- failureType = "DEPENDENCY_ERROR"
- Recovery action executed (reinstall dependencies)

Code Path Covered:
Classifier + recovery switch case

------------------------------------------------------------

Test Case 6: Unknown Error (ML Classification)

Objective:
Verify fallback classification mechanism

Input:
error = "Random unknown error"

Expected Output:
failureType = "ML_CLASSIFIED_FAILURE"

Code Path Covered:
Default classifier branch

------------------------------------------------------------

Test Case 7: Notification Failure Handling

Objective:
Ensure pipeline does not crash if notification fails

Input:
Simulated SMTP/network failure

Expected Output:
- Error logged
- Pipeline continues execution

Code Path Covered:
Notification error handling

------------------------------------------------------------

Test Case 8: Recovery Manager Branch Coverage

Objective:
Verify all recovery cases

Input & Expected Output:

LOGIC_ERROR        -> Manual fix required
SYNTAX_ERROR       -> Manual recovery required
DEPENDENCY_ERROR   -> Reinstall dependencies
TIMEOUT_ERROR      -> Restart pipeline
ENVIRONMENT_ERROR  -> Check environment

Code Path Covered:
All switch cases in recovery manager

------------------------------------------------------------

Test Case 9: Monitoring Status Transitions

Objective:
Verify correct status updates

Input:
Start pipeline and simulate success/failure

Expected Output:
RUNNING -> SUCCESS
RUNNING -> FAILED

Code Path Covered:
Monitoring service calls

------------------------------------------------------------

Test Case 10: Logging Execution

Objective:
Verify logs are recorded correctly

Input:
Run pipeline

Expected Output:
- Logs stored in file or database
- Messages include:
  Pipeline start
  Failure/success
  Recovery actions

Code Path Covered:
Logger + DB logging

-----------------------------------------------------------

Test Case 11: Save Pipeline Run (DB Insert Success)

Objective:
Verify that pipeline execution data is correctly stored in the database

Input:
status = "SUCCESS"
failureType = null
recoveryAction = null

Expected Output:
- New record inserted into pipeline_runs table
- No database error

Code Path Covered:
savePipelineRun() → db.query INSERT

------------------------------------------------------------

Test Case 12: Save Pipeline Run (DB Insert Failure)

Objective:
Verify error handling when database insertion fails

Input:
Simulate DB failure (e.g., disconnect DB)

Expected Output:
- Console prints: "DB Error"
- Application does not crash

Code Path Covered:
Error callback in db.query()

------------------------------------------------------------

Test Case 13: Save Log Entry (Default Level)

Objective:
Verify log insertion with default level

Input:
message = "Pipeline Started"
(no level passed)

Expected Output:
- Log stored with level = "INFO"

Code Path Covered:
Default parameter (level = "INFO")

------------------------------------------------------------

Test Case 14: Save Log Entry (Custom Level)

Objective:
Verify log insertion with custom level

Input:
message = "Failure detected"
level = "ERROR"

Expected Output:
- Log stored with level = "ERROR"

Code Path Covered:
saveLog() with custom parameter

------------------------------------------------------------

Test Case 15: Retrieve Last Pipeline Status

Objective:
Verify fetching latest pipeline status

Input:
Call getLastStatus()

Expected Output:
- Returns latest status from pipeline_runs table
- Example: "SUCCESS" or "FAILED"

Code Path Covered:
SELECT query with ORDER BY DESC LIMIT 1

------------------------------------------------------------

Test Case 16: Retrieve Last Status When No Data Exists

Objective:
Verify behavior when table is empty

Input:
Empty pipeline_runs table

Expected Output:
- Returns "UNKNOWN"

Code Path Covered:
results[0]?.status || "UNKNOWN"

------------------------------------------------------------

Test Case 17: Retrieve Logs

Objective:
Verify fetching recent logs

Input:
Call getLogs()

Expected Output:
- Returns list of logs (max 10 entries)
- Ordered by latest first

Code Path Covered:
SELECT query with ORDER BY created_at DESC

------------------------------------------------------------

Test Case 18: Retrieve Logs (DB Failure)

Objective:
Verify error handling when log retrieval fails

Input:
Simulate DB error

Expected Output:
- Promise rejected with error

Code Path Covered:
reject(err) in getLogs()

------------------------------------------------------------

Test Case 19: SQL Query Parameter Binding

Objective:
Ensure queries use parameterized inputs to prevent SQL injection

Input:
message = "'; DROP TABLE logs; --"

Expected Output:
- Data stored as string
- No SQL injection occurs

Code Path Covered:
db.query(query, [params])

------------------------------------------------------------

Test Case 20: Integration of BLL with DB Layer

Objective:
Verify that pipeline execution triggers DB storage

Input:
Run pipeline with success/failure

Expected Output:
- savePipelineRun() called
- saveLog() called
- Data stored correctly in DB

Code Path Covered:
BLL → DB interaction

Testing Methodology:

White box testing was performed by executing the pipeline with controlled inputs and simulated errors. Different execution paths such as validation, success, failure, classification, recovery, and logging were tested to ensure correct internal behavior of the system.