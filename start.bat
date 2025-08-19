@echo off
echo Starting Smart Motion...

REM Start and wait for all services to be healthy
docker-compose up --build --wait

echo Services are almost ready!
timeout /t 7 /nobreak >nul
start http://localhost:8081
echo Smart Motion is now open in your browser!