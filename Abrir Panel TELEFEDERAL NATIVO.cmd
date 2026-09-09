@echo off
setlocal
cd /d "%~dp0"

set "PANEL_CLOUD_URL=https://panel-telefederal-cloud.onrender.com"
set "PANEL_PREMIERE_URLS=http://127.0.0.1:3005;https://panel-telefederal-cloud.onrender.com"
set "BRIDGE_SECRET=tf-6pv5xj4n54oawhaekt81g8mtub2wk1"

set "PORT=3005"
set "VMIX_HOST=127.0.0.1"
set "VMIX_PORT=8088"
set "ENABLE_PANEL_MONITORS=0"
set "PANEL_MONITOR_SOURCE=vmix-external"
set "PANEL_PROGRAM_DEVICE=vMix Video"
set "PANEL_PREVIEW_DEVICE=vMix Video External 2"
set "PANEL_MONITOR_WIDTH=640"
set "PANEL_MONITOR_HEIGHT=360"
set "PANEL_MONITOR_FPS=25"
set "PANEL_MONITOR_QUALITY=9"
set "LOCAL_PANEL_HOST=127.0.0.1"
set "LOCAL_PANEL_PORT=3005"
set "MONITOR_RELAY_FPS=0"

set "NODE=%~dp0runtime\node.exe"
if not exist "%NODE%" set "NODE=node.exe"

echo Iniciando Panel TELEFEDERAL local...
start "Panel TELEFEDERAL Local" /min "%NODE%" server.js 1>"%~dp0panel-telefederal.out.log" 2>"%~dp0panel-telefederal.err.log"

timeout /t 4 /nobreak >nul

echo Iniciando Bridge TELEFEDERAL Cloud...
start "Bridge TELEFEDERAL Cloud" /min "%NODE%" bridge.js 1>"%~dp0bridge-telefederal.out.log" 2>"%~dp0bridge-telefederal.err.log"

timeout /t 2 /nobreak >nul

echo Abriendo Panel TELEFEDERAL Nativo...
start "Panel TELEFEDERAL Nativo" "%~dp0native-panel\TeleFederalPanelNative.exe"

echo.
echo TELEFEDERAL iniciado.
echo Usar los botones Premiere Play y Premiere Stop de la barra superior del panel nativo.
echo Si hace falta publicar monitores a la nube, abrir tambien "Abrir Publicador WebRTC TELEFEDERAL.cmd".
echo.
pause
