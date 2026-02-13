# Software Architecture Style
## Project: Resilient_CI – CI/CD Automation with Intelligent Failure Recovery

## Chosen Architecture Style: Layered Architecture

### Overview
Resilient_CI follows a **Layered Architecture** where the system is divided into logical layers, each responsible for a specific functionality.

### Layers in the System

1. Presentation Layer
   - Developer Interface
   - DevOps Monitoring Interface

2. Application / Service Layer
   - CI/CD Execution Module
   - Failure Detection Module
   - Log Analysis Module
   - Failure Classification Module (Rule-based + ML)
   - Recovery Module
   - Notification Module

3. Data Layer
   - Source Code Repository
   - Build & Execution Logs
   - Failure Knowledge Base

### Key Characteristics
- Clear separation of concerns
- High cohesion within layers
- Low coupling between layers
- Structured data flow
