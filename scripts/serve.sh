#!/bin/bash

secret=$(head -c20 /dev/urandom | base64)
export SESSION_SECRET=${secret}

# -o is standard out log file, -e is standard error log file
node_modules/forever/bin/forever start -o out.log -e err.log server.js
