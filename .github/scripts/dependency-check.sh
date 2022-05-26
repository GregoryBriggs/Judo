#!/bin/bash
# Usable script for dependency check scans

# print status
echo "Starting script"
echo ""

# update npm 
 npm install -g npm@8.10.0

# print status
echo "install dependency check"

# install dependency check
 npm install dependency-check

# print status
echo " npm install dependency-check successful"
echo "running dependency check"

find . -name 'dependency-check'
chmod 766 './node_modules/.bin/dependency-check'
pwd
ls -als

echo "running dependency check"

# run at root of the project
npx dependency-check --version
npx dependency-check ./**/*.json

exit