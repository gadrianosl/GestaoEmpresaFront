@echo off
echo ========================================
echo  Instalando Dependencias do Projeto Angular
echo ========================================

REM Definir o caminho para o Node.js
set NODE_PATH=C:\Users\DIER\IdeaProjects\Node\node-v20.19.5-win-x64
set PATH=%NODE_PATH%;%PATH%

echo Node.js versao:
"%NODE_PATH%\node.exe" --version

echo NPM versao:
"%NODE_PATH%\npm.cmd" --version

echo ========================================
echo Instalando dependencias...
echo ========================================
"%NODE_PATH%\npm.cmd" install

echo ========================================
echo Instalando Angular CLI globalmente...
echo ========================================
"%NODE_PATH%\npm.cmd" install -g @angular/cli

echo ========================================
echo Dependencias instaladas com sucesso!
echo ========================================
echo Para executar o projeto, use: run.bat

pause