# HOSTING AND DEVELOPMENT PLAN
# 1. Hosting Platform (AWS Cloud)


### Backend Server – AWS EC2
- CI/CD backend is hosted on AWS EC2 instance.
- Runs Node.js runtime environment.
- Executes CI/CD pipeline and internal modules.
- Provides scalable compute resources.

### Source Code Repository – GitHub
- Stores project source code.
- Triggers pipeline when developer pushes code.
- Backend server fetches latest code from repository.

### Data Storage – SQL DATABASE
- Stores execution logs and failure reports.
- Provides secure and durable storage.



## 3. Deployment Strategy

The deployment process follows these steps:

1. Developer pushes code to GitHub repository.
2. GitHub triggers the CI/CD workflow.  
3. AWS EC2 server fetches latest source code.
4. CI/CD execution module builds and tests the application.
5. Failure detection and classification modules analyze results.
6. Recovery module performs restart if failure occurs.
7. Execution logs are stored in sql database
8. System sends response and notifications to user.

This enables continuous integration and automated deployment.

---

## 4. Component Communication

System components communicate using the following approach:
- Frontend communicates with backend via HTTP requests.
- Backend triggers CI/CD execution module.
- Backend communicates with failure detection and classification modules.
- Backend stores execution results and failure data in SQL database using database queries.

All modules interact through the backend server.

---

## 5. Scalability and Availability

The system supports scalability using AWS services:

- AWS EC2 allows scaling of computing resources based on demand.
- Multiple pipeline executions can run simultaneously.
- AWS infrastructure ensures high availability and reduced downtime.

This makes the system suitable for handling increased workload.

---

## 6. Server Configuration
The server environment is configured using:

- Node.js runtime installation on EC2 instance.
- Dependency installation using 'npm install'.
- Environment variables for configuration.
- Server execution using Node.js.

---

## 7. Security Measures

The system implements the following security practices:

- HTTPS for secure communication.
- AWS Identity and Access Management (IAM) for access control.
- Environment variables for sensitive data.
- Firewall and network security configuration.

These measures ensure secure system operation.

