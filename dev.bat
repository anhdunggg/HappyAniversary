@echo off
echo ==========================================
echo  Setting up and starting Anniversary Project
echo ==========================================

echo.
echo [1/2] Checking/Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing dependencies.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/2] Starting development server...
echo available at http://localhost:3000
call npm run dev

pause
