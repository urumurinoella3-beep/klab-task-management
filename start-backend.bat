@echo off
echo ========================================
echo Starting kLab Task Management Backend
echo ========================================
echo.
echo Backend API will run on: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

cd back_end
mvn spring-boot:run

pause
