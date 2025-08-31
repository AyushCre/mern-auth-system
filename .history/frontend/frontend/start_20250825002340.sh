#!/bin/bash

echo "Starting Frontend Application..."
echo "Installing dependencies if needed..."
npm install

if [ $? -ne 0 ]; then
    echo "Failed to install dependencies. Please check your npm setup."
    exit 1
fi

echo "Starting development server..."
npm start

if [ $? -ne 0 ]; then
    echo "Failed to start the development server. Please check for errors."
    exit 1
fi
