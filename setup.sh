#!/bin/bash

# updating and upgrading the system
echo "Updating and upgrading the system"
sudo apt update -y
sudo apt upgrade -y

# Check if docker is installed
echo "Installing Docker"
if ! command -v docker &> /dev/null; then
     echo "Docker is not installed. Installing now...."
     sudo apt install -y docker.io
else
     echo "Docker is already installed."
fi

# Check if nginx is installed
echo "Installing Nginx"
if ! command -v nginx &> /dev/null; then
     echo "Nginx is not instaled. Installing now...."
     sudo apt install -y nginx
else
     echo "Nginx is already installed."
fi

# Restart Nginx to apply any configuration changes
sudo systemctl restart nginx
