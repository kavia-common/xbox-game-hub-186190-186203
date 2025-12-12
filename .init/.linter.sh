#!/bin/bash
cd /home/kavia/workspace/code-generation/xbox-game-hub-186190-186203/xbox_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

