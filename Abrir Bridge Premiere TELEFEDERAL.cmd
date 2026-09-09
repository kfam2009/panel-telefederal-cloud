@echo off
setlocal
cd /d "%~dp0"

set "PANEL_CLOUD_URL=https://panel-telefederal-cloud.onrender.com"
set "BRIDGE_SECRET=tf-6pv5xj4n54oawhaekt81g8mtub2wk1"

set "NODE=%~dp0runtime\node.exe"
if not exist "%NODE%" set "NODE=node.exe"

echo Iniciando Bridge Premiere TELEFEDERAL...
echo Dejar esta ventana abierta en la PC donde esta Adobe Premiere Pro.
echo.
"%NODE%" premiere-bridge.js

echo.
echo Bridge Premiere finalizado.
pause
