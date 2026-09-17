-- kLab Task Management System - Database Setup Script
-- This script will create the database and verify the setup

-- Connect to PostgreSQL as postgres user first
-- psql -U postgres

-- Create the database
CREATE DATABASE "klab-task-management";

-- Connect to the new database
\c klab-task-management

-- The tables will be created automatically by Spring Boot JPA (ddl-auto=update)
-- But here's the schema that will be generated:

-- Task table (auto-created by JPA)
-- CREATE TABLE tasks (
--     id BIGSERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     status VARCHAR(50) NOT NULL DEFAULT 'Pending',
--     priority VARCHAR(50) NOT NULL DEFAULT 'Medium',
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- Optional: Insert some sample data to test
-- (You can run these after starting the Spring Boot application)

-- INSERT INTO tasks (title, description, status, priority, created_at) VALUES
-- ('Complete kLab Challenge', 'Build a full-stack task management system', 'In Progress', 'High', NOW()),
-- ('Learn Spring Boot', 'Study Spring Boot documentation and tutorials', 'Completed', 'Medium', NOW()),
-- ('Set up PostgreSQL', 'Install and configure PostgreSQL database', 'Completed', 'High', NOW()),
-- ('Design UI', 'Create wireframes and design the user interface', 'Pending', 'Medium', NOW()),
-- ('Deploy Application', 'Deploy to cloud platform', 'Pending', 'Low', NOW());

-- Verify database creation
SELECT current_database();

-- Show all tables (after Spring Boot creates them)
-- \dt

-- Quit
-- \q
