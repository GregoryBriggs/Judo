#!/bin/bash
# Usable script for dependency check scans

# update npm 
npm install -g npm@8.10.0

# install dependency check
npm install dependency-check

# run at root of the project
npx dependency-check --scan ../

exit