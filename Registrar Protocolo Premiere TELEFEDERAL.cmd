@echo off
setlocal
cd /d "%~dp0"

set "SCRIPT=%~dp0premiere-protocol.ps1"
if not exist "%SCRIPT%" (
  echo No encuentro "%SCRIPT%".
  pause
  exit /b 1
)

set "COMMAND=powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File \"%SCRIPT%\" \"%%1\""

reg add "HKCU\Software\Classes\telefederal-premiere" /ve /d "URL:TELEFEDERAL Premiere Protocol" /f >nul
reg add "HKCU\Software\Classes\telefederal-premiere" /v "URL Protocol" /d "" /f >nul
reg add "HKCU\Software\Classes\telefederal-premiere\shell\open\command" /ve /d "%COMMAND%" /f >nul

echo Protocolo TELEFEDERAL Premiere registrado.
echo El panel puede usar telefederal-premiere://play y telefederal-premiere://stop.
