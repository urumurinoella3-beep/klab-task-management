@echo off
echo ========================================
echo kLab Task Management System
echo Database Setup Script
echo ========================================
echo.

echo This script will create the PostgreSQL database.
echo.
echo Make sure PostgreSQL is installed and running!
echo.
echo Default credentials:
echo   Username: postgres
echo   Password: noella@090
echo   Database: klab-task-management
echo.

pause

echo.
echo Creating database...
echo.

psql -U postgres -c "CREATE DATABASE \"klab-task-management\";"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Database created successfully!
    echo ========================================
    echo.
    echo You can now run the backend:
    echo   cd back_end
    echo   gradlew.bat bootRun
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Failed to create database
    echo ========================================
    echo.
    echo Possible reasons:
    echo   1. PostgreSQL is not running
    echo   2. Wrong username or password
    echo   3. Database already exists
    echo.
    echo To check if database exists:
    echo   psql -U postgres -l
    echo.
)

pause
