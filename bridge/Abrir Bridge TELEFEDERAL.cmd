@echo off
cd /d "%~dp0"

set "PANEL_CLOUD_URL=https://REEMPLAZAR-CON-TU-URL-DE-RENDER.onrender.com"
set "BRIDGE_SECRET=REEMPLAZAR-CON-TU-SECRETO"
set "VMIX_HOST=127.0.0.1"
set "VMIX_PORT=8088"

set "NODE=%~dp0..\runtime\node.exe"
if not exist "%NODE%" set "NODE=node.exe"

"%NODE%" bridge.js
