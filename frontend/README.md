# To-Do Task Manager

## Overview 

This is the frontend for the To-Do App, built using React and TypeScript. It interacts with the FastAPI backend to manage tasks, providing a simple, clean and responsive UI.

## Features

- Create a task with a title and description
- Retrieve and display all tasks
- Edit a task's title and description
- Mark a task as complete or incomplete
- Delete a task
- Filter tasks by status (All, Completed, Pending)
- Sort tasks by creation date

## Tech Stack
- **Frontend**: React, TypeScript
- **State Management**: useState
- **API Communication**: axios
- **Styling**: CSS

## Setup and installation

### API Integration

The frontend interacts with the backend API using `axios`. Ensure the backend is running before making requests

### Prerequisites

- Node.js v18+ or 20+
- Package manager (npm, yarn, etc..)

1. Clone the Repository
```bash
https://github.com/C2Technologies/c2_intern_assement
cd c2_intern_assement
```

2. Install Dependencies
```bash
npm install
```

3. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`
