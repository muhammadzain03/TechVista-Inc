@echo off
echo ========================================
echo Starting TechVista Inc. E-commerce App
echo ========================================
echo.

REM === Backend Setup ===
echo [1/4] Setting up Backend...
cd /d "%~dp0Backend"

REM Create venv if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        echo Make sure Python is installed and accessible
        pause
        exit /b 1
    )
)

REM Install backend dependencies
echo Installing Python dependencies...
.\venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo [2/4] Starting Flask Backend...
REM Start Flask backend using the simple script
start "TechVista Backend - Port 5000" cmd /c "cd /d \"%~dp0Backend\" && start_backend.bat"

REM === Frontend Setup ===
echo [3/4] Setting up Frontend...
cd /d "%~dp0"

REM Install frontend dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing npm dependencies...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install npm dependencies
        echo Make sure Node.js is installed
        pause
        exit /b 1
    )
)

echo [4/4] Starting React Frontend...
REM Start React frontend using the simple script
start "TechVista Frontend - Port 3000" cmd /c "cd /d \"%~dp0\" && start_frontend.bat"

REM Wait a bit for servers to start
echo.
echo Waiting for servers to start...
timeout /t 8 >nul

REM Open the website
echo Opening website in browser...
start http://localhost:3000

echo.
echo ========================================
echo ✅ TechVista Inc. App Started Successfully!
echo ========================================
echo.
echo Two new windows have opened:
echo 📦 Backend Server (Flask) - Port 5000
echo 🌐 Frontend Server (React) - Port 3000
echo.
echo 🌍 Website: http://localhost:3000
echo.
echo Keep both terminal windows open to run the app.
echo Close this window when you're done.
echo ========================================
pause
