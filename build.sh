#!/bin/bash
# This script will copy all files from the current directory to the specified remote directory on the server

# Set variables
remote_user="ubuntu"
remote_ip="43.134.126.166"
remote_directory="/home/ubuntu/codes/demo-lesson-planner-server"

# Copy .env file to remote directory
scp .env ${remote_user}@${remote_ip}:${remote_directory}/.env

# Copy files to remote server
scp -r * ${remote_user}@${remote_ip}:${remote_directory}