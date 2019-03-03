#!/bin/bash

echo
echo configuring pm2 to startup via systemd
pm2 start /opt/app/server.js -i 0
pm2 startup systemd
# todo - dont assume it worked
pm2 save
