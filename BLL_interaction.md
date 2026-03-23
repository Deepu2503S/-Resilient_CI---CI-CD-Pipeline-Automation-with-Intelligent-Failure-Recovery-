 1. Overview

The Business Logic Layer (BLL) contains the core logic of the system and connects the CLI (user interface) with backend modules and the database.

---
 2. Core BLL Module

The main BLL module is:

- pipelineManager.js  
  Handles pipeline execution, applies business rules, performs logging, recovery, notification, and stores results in database.

---
 3. Interaction with UI (CLI)

CLI (cli.js)->startPipeline() (main.js) -> executePipeline() (pipelineManager.js) -> CI/CD Execution -> Failure Classifier -> Recovery Manager -> Logger + Notification + Monitoring  -> Database
  
---
 4. Explanation

- User runs commands using CLI (run, status, logs)
- CLI calls startPipeline() from main.js
- main.js initializes dependencies and calls executePipeline()
- pipelineManager.js executes core logic
- Results are stored in database and returned to CLI

