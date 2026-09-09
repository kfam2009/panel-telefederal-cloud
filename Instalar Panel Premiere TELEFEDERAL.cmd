@echo off
setlocal
cd /d "%~dp0"

set "EXTENSION_ID=com.telefederal.premierebridge"
set "SOURCE=%~dp0premiere-extension\%EXTENSION_ID%"
set "DEST=%APPDATA%\Adobe\CEP\extensions\%EXTENSION_ID%"

if not exist "%SOURCE%\CSXS\manifest.xml" (
  echo No encuentro la extension en "%SOURCE%".
  pause
  exit /b 1
)

echo Habilitando extensiones sin firmar para Adobe CEP...
for %%V in (8 9 10 11 12 13) do (
  reg add "HKCU\Software\Adobe\CSXS.%%V" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul
)

echo Instalando TELEFEDERAL Bridge para Premiere...
if not exist "%APPDATA%\Adobe\CEP\extensions" mkdir "%APPDATA%\Adobe\CEP\extensions"
if exist "%DEST%" rmdir /s /q "%DEST%"
xcopy "%SOURCE%" "%DEST%\" /E /I /Y >nul

echo.
echo Instalado.
echo Cerrar y abrir Premiere. Luego ir a Ventana ^> Extensiones o Extensiones heredadas ^> TELEFEDERAL Bridge.
echo Dejar ese panel abierto dentro de Premiere mientras se usa el panel TELEFEDERAL.
echo.
pause
