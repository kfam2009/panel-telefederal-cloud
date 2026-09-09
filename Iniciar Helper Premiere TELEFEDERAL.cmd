@echo off
setlocal
cd /d "%~dp0"

set "PANEL_CLOUD_URL=https://panel-telefederal-cloud.onrender.com"
set "PANEL_PREMIERE_URLS=http://127.0.0.1:3005;https://panel-telefederal-cloud.onrender.com"
set "BRIDGE_SECRET=tf-6pv5xj4n54oawhaekt81g8mtub2wk1"

set "NODE=%~dp0runtime\node.exe"
if not exist "%NODE%" set "NODE=node.exe"

start "Helper Premiere TELEFEDERAL" /min "%NODE%" premiere-helper.js 1>"%~dp0premiere-helper.out.log" 2>"%~dp0premiere-helper.err.log"
