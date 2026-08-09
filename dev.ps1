#!/usr/bin/env pwsh
# Development server launcher with ESM/CommonJS fix

$env:NODE_OPTIONS = '--experimental-require-module'
npm run dev
