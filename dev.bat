@echo off
REM Development server launcher with ESM/CommonJS fix
set NODE_OPTIONS=--experimental-require-module
npm run dev
