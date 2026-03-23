CREATE DATABASE resilient_ci;
USE resilient_ci;

CREATE TABLE pipeline_runs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(20),
    failure_type VARCHAR(50),
    recovery_action VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT,
    level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);