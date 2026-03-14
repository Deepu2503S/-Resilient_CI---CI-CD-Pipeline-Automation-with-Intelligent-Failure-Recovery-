1.  User Interface Type
 We selected a Command Line Interface (CLI) as the user interface.

A Command Line Interface allows users to interact with the system by entering commands in a terminal or command prompt.


 2. Justification for Choosing CLI

The CLI is an appropriate UI for the Resilient_CI system for the following reasons:

- CI/CD systems are primarily used by developers and DevOps engineers who are comfortable using terminal commands.
- Many popular DevOps tools such as Git, Docker, and Kubernetes use command‑line interfaces.
- CLI integrates easily with backend modules written in Node.js.
- It allows quick execution of pipeline commands without building a complex graphical interface.
- It is lightweight and efficient for automation and scripting.

 3. User Interaction Through CLI

Users interact with the system using commands executed in the terminal.

Example commands:
- run-pipeline → Starts the CI/CD pipeline execution.
- status → Displays the current status of the pipeline.
- logs → Shows execution logs generated during the pipeline run.

4. Interaction Flow Diagram
  User (Developer) ->Command Line Interface (CLI) ->Pipeline Controller (main.js) -> CI/CD Execution Module -> Failure Classifier -> Recovery Manager->  Logger and Notification Service