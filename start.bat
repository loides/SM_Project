@echo off
echo Starting Smart Motion...

docker-compose up --build --wait
if errorlevel 1 (
    echo Docker failed to start.
    pause
    exit /b 1
)

echo Services are almost ready!
timeout /t 7 /nobreak >nul
start http://localhost:8081
echo Smart Motion is now open in your browser!