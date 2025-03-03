# To-Do App Assessment

## Overview
The **To-Do App** is a task management application designed to help users efficiently organize their tasks. With a simple and intuitive interface, users can create, edit, delete, and organize tasks with ease. Whether you're managing daily chores, work projects, or personal goals, this app ensures you stay on top of your responsibilities.

---

## Features
- **Task Management**: Create, edit, and delete tasks.
- **Intuitive Interface**: User-friendly design for seamless task organization.
- **Responsive Design**: Works on both desktop and mobile devices.
- **Backend Integration**: Built with Python FastAPI for the backend and React for the frontend.
- **Database Support**: Uses PostgreSQL for persistent data storage.


### Backend

- A **REST API** with the following endpoints:
  - `POST /tasks` → Create a new task.
  - `GET /tasks` → Retrieve all tasks.
  - `GET /tasks/{task_id}` → Retrieve a single task.
  - `PUT /tasks/{task_id}` → Update a task (title, description, completed status).
  - `DELETE /tasks/{task_id}` → Delete a task.
  
---

## Live Demo
A live demo of the application is available here:  
👉 [Click here to visit the application](https://c2-intern-assement.vercel.app/)

**Note**: The live application is not connected to a database.

---

## Requirements
To run this application locally, ensure your system meets the following prerequisites:

### Software Requirements
- **Python 3.x**: The backend of this application is built using Python 3.
- **Node.js**: The frontend is built using React, which requires Node.js.
- **PostgreSQL**: The application uses PostgreSQL as its database.

### Tools
- **Git**: For cloning the repository.
- **Package Managers**:
  - `pip` for Python dependencies.
  - `npm` for Node.js dependencies.

---

## Installation & Setup
Follow these steps to set up and run the application locally.

### 1. Clone the Repository
Clone the repository to your local machine using Git:
```bash
git clone --branch todo-app-ernest-matshabe git@github.com:C2Technologies/c2_intern_assement.git
```

### 2. Clone the Repository
Navigate to the project directory:
```bash
cd c2_intern_assement
```

### 3. Configure PostgreSQL
Ensure PostgreSQL is running locally before starting the backend.
```bash
Edit config.json in the root direcory of the project to match your PostgreSQL credentials:
{
    "POSTGRES_USER": "postgres",
    "POSTGRES_PASSWORD": "12345",
    "POSTGRES_HOST": "localhost",
    "POSTGRES_PORT": 5432,
    "POSTGRES_DB": "postgres"
}
```

### 4. Setting Up & Running the Backend (FastAPI)
Create a Virtual Environment
```bash
# Windows/macOS/Linux
python -m venv venv
# OR
python3 -m venv venv
```

### 5. Activate the Virtual Environment
For Windows:
```bash
venv\Scripts\activate
```

For macOS/Linux:
```bash
source venv/bin/activate
```

### 6. Install Dependencies
```bash
pip install -r ./backend/requirements.txt
```

### 6. Run the Backend Server
```bash
python3 backend/app/main.py
python backend/app/main.py
```

### 7. Setting Up & Running the Frontend (React)
Navigate to the Frontend Directory
```bash
cd frontend
```

### 8.  Install Dependencies
```bash
npm install
```

### 9.  Start the Frontend Server
```bash
npm start
```


### 10. Additional Commands
Stop the Backend Server
Press CTRL + C in the terminal running uvicorn.

Stop the Frontend Server
Press CTRL + C in the terminal running npm start.

Deactivate the Virtual Environment
```bash
deactivate
```

# Contact
For any questions or support, feel free to reach out at ematshabe023@student.wethinkcode.co.za

