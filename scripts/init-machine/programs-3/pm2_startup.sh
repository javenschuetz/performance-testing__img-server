#!/bin/bash

echo
echo configuring pm2 to startup via systemd
pm2 start /opt/app/server.js -i 0
echo this does not work
# todo - the output of this command is the command we need, weirdly enough.
# Its 2 lines down...
pm2 startup systemd
# todo - dont assume it worked
pm2 save
