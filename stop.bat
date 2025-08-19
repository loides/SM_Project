@echo off
echo Stopping Smart Motion...

REM Start and wait for all services to be stopped
docker-compose down

echo Services are down.