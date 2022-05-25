#!/bin/bash
# Usable script for dependency check scans

# print status
echo "Starting script"
echo ""

# update npm 
sudo npm install -g npm@8.10.0

# print status
echo "install dependency check"

# install dependency check
sudo npm install dependency-check

# print status
echo "sudo npm install dependency-check successful"
echo "running dependency check"

find . -name 'dependency-check'
chmod 766 './node_modules/.bin/dependency-check'

echo "running dependency check"

# run at root of the project
sudo npx dependency-check --scan ../

exit