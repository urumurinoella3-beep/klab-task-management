-- Sample Data for Task Management System
-- Run this after the Spring Boot application has created the tables
-- This will populate the database with sample tasks for testing

-- Connect to the database
-- psql -U postgres -d klab-task-management

-- Optional: Clear existing data first
-- TRUNCATE TABLE tasks RESTART IDENTITY CASCADE;

-- Insert sample tasks
INSERT INTO tasks (title, description, status, priority, created_at) VALUES
('Complete kLab Challenge', 'Build a full-stack task management system with React, Spring Boot, and PostgreSQL', 'In Progress', 'High', NOW()),
('Set up Development Environment', 'Install PostgreSQL, Java 17, Node.js, and configure development tools', 'Completed', 'High', NOW() - INTERVAL '2 days'),
('Design Database Schema', 'Plan the task table structure with all required fields', 'Completed', 'Medium', NOW() - INTERVAL '1 day'),
('Build Backend API', 'Create REST API endpoints using Spring Boot', 'Completed', 'High', NOW() - INTERVAL '1 day'),
('Implement Frontend', 'Build React application with task list, forms, and filters', 'Completed', 'High', NOW() - INTERVAL '12 hours'),
('Write Documentation', 'Create comprehensive README and setup guides', 'In Progress', 'Medium', NOW() - INTERVAL '6 hours'),
('Test All Features', 'Verify CRUD operations, filtering, and responsive design', 'Pending', 'High', NOW()),
('Deploy Application', 'Deploy frontend to Netlify and backend to Heroku', 'Pending', 'Low', NOW()),
('Add Search Feature', 'Implement search functionality for tasks', 'Pending', 'Low', NOW()),
('Code Review', 'Review code quality and refactor if needed', 'Pending', 'Medium', NOW());

-- Verify the data was inserted
SELECT COUNT(*) as total_tasks FROM tasks;
SELECT status, COUNT(*) as count FROM tasks GROUP BY status;
SELECT priority, COUNT(*) as count FROM tasks GROUP BY priority;

-- View all tasks
SELECT id, title, status, priority, created_at FROM tasks ORDER BY created_at DESC;

-- Note: After running this script, refresh your frontend application
-- to see the sample tasks appear in the UI
