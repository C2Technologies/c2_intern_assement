#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Navigate to the frontend directory and install dependencies
cd todo-app
npm install

# Return to the main directory
cd ..

# Start the backend
python3 app.py &


# Wait for 5 seconds to ensure the backend is running
sleep 3

cd todo-app

# Start the frontend
npm run dev
