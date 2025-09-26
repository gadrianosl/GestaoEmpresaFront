@echo off
echo ========================================
echo  Executando Projeto Angular
echo ========================================

REM Definir o caminho para o Node.js
set NODE_PATH=C:\Users\DIER\IdeaProjects\Node\node-v20.19.5-win-x64
set PATH=%NODE_PATH%;%PATH%

echo Iniciando servidor de desenvolvimento...
"%NODE_PATH%\npm.cmd" start

pause