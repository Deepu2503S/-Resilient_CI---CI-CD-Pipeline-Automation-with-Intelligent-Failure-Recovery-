
 1. Overview

Black Box Testing is a testing method where the system is tested without any knowledge of its internal code or structure. The focus is on inputs and outputs.

In this project, testing is performed on the CLI (user interface).

---

2. Test Cases

 Test Case 1: Run Pipeline Command

Input:
node cli.js run

Expected Output:
- Pipeline starts successfully
- Execution messages are displayed

Actual Output:
- Pipeline started and executed

Result:
PASS

---

 Test Case 2: Check Pipeline Status

Input:
node cli.js status

Expected Output:
- Displays latest pipeline status (SUCCESS / FAILURE)

Actual Output:
- Status displayed correctly

Result:
PASS

---

 Test Case 3: View Logs

Input:
node cli.js logs

Expected Output:
- Displays execution logs from database or file

Actual Output:
- Logs displayed correctly

Result:
PASS

---

 Test Case 4: Invalid Command

Input:
node cli.js abc

Expected Output:
- Shows available commands

Actual Output:
- Help message displayed

Result:
PASS

---

 Test Case 5: No Command Input

Input:
node cli.js

Expected Output:
- Displays help or usage instructions

Actual Output:
- Help message displayed

Result:
PASS

---
Test Case 6: Database Not Available

Input:
node cli.js status

Condition:
- Database connection is down

Expected Output:
- Error message or fallback response (e.g., "Unable to fetch status")

Actual Output:
- Error handled properly / message displayed

Result:
PASS

---

 Test Case 7: Empty Logs

Input:
node cli.js logs

Condition:
- No logs present in database or file

Expected Output:
- Message: "No logs found"

Actual Output:
- Proper message displayed

Result:
PASS

---

 Test Case 8: Large Logs Handling

Input:
node cli.js logs

Condition:
- Large number of logs present

Expected Output:
- Logs displayed correctly without crashing

Actual Output:
- Logs displayed successfully

Result:
PASS

---

 Test Case 9: Notification Trigger

Input:
node cli.js run

Condition:
- Pipeline fails

Expected Output:
- User receives failure notification

Actual Output:
- Notification sent successfully

Result:
PASS
