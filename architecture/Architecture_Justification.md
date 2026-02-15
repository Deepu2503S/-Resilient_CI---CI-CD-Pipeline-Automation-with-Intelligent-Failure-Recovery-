# Architecture Justification
## Project: Resilient_CI

## A. Justification Based on Granularity

The system components are divided into well-defined layers:

- Each layer has a specific responsibility.
- Modules such as CI/CD Execution, Failure Detection, and Recovery operate independently.
- Data stores are separated from processing logic.
- Communication occurs only between adjacent layers.

This confirms that the system follows a **Layered Architecture pattern**.

---

## B. Why Layered Architecture is the Best Choice

### Maintainability
- Each module can be modified independently.
- Example: ML classifier can be upgraded without affecting CI/CD logic.

### Scalability
- Failure classification and notification modules can scale independently.
- Future migration to microservices is possible.

### Performance
- Structured flow prevents unnecessary cross-component communication.
- Logging and analysis are separated to avoid bottlenecks.

### Modularity
- Components are reusable and loosely coupled.

### Academic Suitability
- Easy to understand, design, and document.
- Ideal for structured software engineering projects.
