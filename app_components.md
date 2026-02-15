# Application Components
## Project: Resilient_CI – CI/CD Automation with Intelligent Failure Recovery

---

## Overview
This document describes the main application components of the Resilient_CI system. Each component represents a functional module responsible for a specific task in the CI/CD pipeline.

---

## 1. Developer Component
- Pushes source code to the version control system.
- Creates pull requests and merges code.
- Views pipeline status and notifications.

---

## 2. Version Control System
- Stores source code repositories.
- Triggers the CI/CD pipeline on code push or merge.
- Provides the latest source code to the pipeline.

---

## 3. CI/CD Execution Module
- Fetches source code from repository.
- Builds the application.
- Executes test cases.
- Deploys the application if tests pass.
- Generates execution logs.

---

## 4. Failure Detection Module
- Detects build failures.
- Detects test failures.
- Detects deployment failures.
- Sends failure information for analysis.

---

## 5. Log Analysis Module
- Reads and processes execution logs.
- Extracts meaningful error patterns.
- Prepares failure data for classification.

---

## 6. Failure Classification Module
- Classifies failures using rule-based techniques.
- Uses ML-based fallback for unknown errors.
- Stores classified failures in the knowledge base.

---

## 7. Recovery Module
- Decides recovery action based on failure type.
- Restarts build if failure is recoverable.
- Restarts pipeline when necessary.

---

## 8. Notification Module
- Sends failure alerts to developers and DevOps engineers.
- Sends recovery status updates.
- Communicates with external notification services.

---

## 9. Data Stores
- Source Code Repository
- Build & Execution Logs
- Failure Knowledge Base

---