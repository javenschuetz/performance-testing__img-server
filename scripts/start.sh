#!/bin/bash

secret=$(head -c20 /dev/urandom | base64)

export IS_DEV=1
export SESSION_SECRET=${secret}

# -L is for legacy mode, useful with vagrant apparently
node_modules/nodemon/bin/nodemon.js -L server.js
