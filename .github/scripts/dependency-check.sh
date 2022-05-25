#!/bin/bash
# Usable script for dependency check scans

# print current directory
ls -als

# update npm 
sudo npm install -g npm@8.10.0

# print current directory
ls -als

# install dependency check
sudo npm install dependency-check

# print current directory
ls -als

# run at root of the project
sudo npx dependency-check --scan ../

exit