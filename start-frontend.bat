@echo off
echo ========================================
echo Starting kLab Task Management Frontend
echo ========================================
echo.
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

cd front_end
call npm run dev

pause
