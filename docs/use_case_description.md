# Use Case Description – Resilient_CI

This document explains the UML Use Case Diagram for the
CI/CD Pipeline Automation with Intelligent Failure Recovery system.

## Actors Description

- **Developer**
  Pushes source code, creates pull requests, and monitors pipeline results.

- **DevOps Engineer**
  Configures CI/CD pipeline execution and recovery strategies.

- **Version Control System**
  Triggers the pipeline automatically on code changes.

- **Monitoring System**
  Detects build, test, and deployment failures.

- **Logging System**
  Collects and stores error logs generated during pipeline execution.

- **ML Model / ML Engine**
  Analyzes logs and classifies failures using rule‑based and ML‑based approaches.

- **Notification Service**
  Sends alerts related to failures and recovery actions.

## Key Use Cases

- Push Source Code  
- Trigger CI/CD Pipeline  
- Build Application  
- Detect Build & Test Failure  
- Detect Deployment Failure  
- Analyze Error Logs  
- Identify Failure Type  
- Classify Failure (Rule‑Based / ML‑Based)  
- Restart Build  
- Restart Pipeline  

This documentation maps system actors to their interactions as shown in the UML diagram.
