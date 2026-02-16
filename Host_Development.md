# HOSTING AND DEVELOPMENT PLAN
# 1. Hosting Platform (AWS Cloud)

The Resilient_CI system is hosted using Amazon Web Services (AWS) to ensure scalability, reliability, and high availability.

### Backend Server – AWS EC2
- CI/CD backend is hosted on AWS EC2 instance.
- Runs Node.js runtime environment.
- Executes CI/CD pipeline and internal modules.
- Provides scalable compute resources.

### Source Code Repository – GitHub
- Stores project source code.
- Triggers pipeline when developer pushes code.
- Backend server fetches latest code from repository.

### Data Storage – AWS S3
- Stores execution logs and failure reports.
- Provides secure and durable storage.

### Database (SOME PART) – AWS RDS
- Stores pipeline execution history.
- Stores failure classification data.