#!/bin/bash
# Usable script for dependency check scans

# install dependency check
npm install dependency-check

# run at root of the project
npx dependency-check --scan ../

exit