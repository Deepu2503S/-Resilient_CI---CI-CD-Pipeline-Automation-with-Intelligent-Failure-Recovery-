# Module Description – Resilient_CI

 1. Source Control Module

--> Responsibilities:
- Accept source code pushes from developers
- Handle pull requests and code merges
- Trigger the CI/CD pipeline when changes are detected

--> Related Use Cases:
- Push Source Code
- Create Pull Request
- Merge Code
- Trigger CI/CD Pipeline


2. CI/CD Execution Module

--> Responsibilities:
- Fetch source code from the repository
- Build the application
- Execute tests
- Initiate deployment process

--> Related Use Cases:
- Fetch Source Code
- Build Application
- Trigger CI/CD Pipeline



3. Failure Detection Module

--> Responsibilities:
- Monitor build, test, and deployment stages
- Detect failures during pipeline execution
- Generate error logs

--> Related Use Cases:
- Detect Build & Test Failure
- Detect Deployment Failure

 4. Log Analysis Module

-->Responsibilities:
- Collect and analyze error logs
- Identify root causes of failures
- Pass information to classification module

--> Related Use Cases:
- Analyze Error Logs
- Identify Failure Type


5. Failure Classification Module

--> Responsibilities:
- Classify failures using rule‑based techniques
- Support ML‑based classification for advanced analysis

--> Related Use Cases:
- Classify Failure 

 6. Recovery Module

--> Responsibilities:
- Decide recovery action based on failure classification
- Restart build if failure is recoverable
- Restart pipeline if deployment fails

-->Related Use Cases:
- Restart Build
- Restart Pipeline


 7. Notification Module

--> Responsibilities:
- Send notifications about failures
- Inform stakeholders about recovery actions taken

--> Related Use Cases:
- Notify Error Logs

