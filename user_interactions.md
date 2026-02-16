# User Access and System Interaction
## Assignment 5 – Resilient_CI

---

## 1. User Access Flow

1. Developer pushes code to GitHub repository.
2. GitHub triggers the CI/CD pipeline.
3. Backend server receives trigger request.
4. CI/CD Execution module builds and tests the application.
5. If failure occurs:
   - Failure Detection module analyzes logs.
   - Failure Classification module categorizes the error.
6. Recovery module restarts pipeline if applicable.
7. Notification module sends status to developer.

---

## 2. Explanation

The developer interacts with the frontend interface, which communicates with the backend server. The backend triggers internal modules such as CI/CD execution and failure classification. Execution results and logs are stored in the data layer, and notifications are sent to the user.