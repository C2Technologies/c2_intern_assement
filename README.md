# To-Do App Assessment

## Overview

This assessment requires you to build a simple **To-Do application** using **React, FastAPI, and Tailwind CSS**. The backend will store tasks in a **PostgreSQL database** using SQLAlchemy ORM.

## Requirements

### Features

- ✅ **Task Management**
  - Users can **create** a task with a **title** and **description**.
  - Users can **edit** a task’s title and description.
  - Users can **delete** tasks.
  - Users can **mark a task as completed/incomplete**.
- ✅ **Filtering & Sorting**
  - Users can **filter tasks** by **completed** and **pending**.
  - Tasks should be **sorted** by **creation date**.
- ✅ **Basic UI & Responsiveness**
  - The **UI must be clean and responsive**.
  - Users should be able to interact smoothly with tasks.

---

## Technical Requirements

### Backend (FastAPI)

- A **REST API** with the following endpoints:
  - `POST /tasks` → Create a new task.
  - `GET /tasks` → Retrieve all tasks.
  - `GET /tasks/{task_id}` → Retrieve a single task.
  - `PUT /tasks/{task_id}` → Update a task (title, description, completed status).
  - `DELETE /tasks/{task_id}` → Delete a task.
- Use **PostgreSQL** as the database.
- Store each task with an **auto-incrementing ID**.

### Frontend (React + Tailwind CSS)

- **State management**: Use `useState`.
- **API Calls**: Use `fetch` or `axios` to communicate with the FastAPI server.
- **Task List UI**: Display tasks with options to **edit**, **delete**, and **mark complete**.
- **Filters**: Buttons to show **All, Completed, and Pending** tasks.

---

## Evaluation Criteria

🔹 **Code Quality** → Clean, modular, decoupled, readable, and well-structured code.  
🔹 **Functionality** → Meets all core feature requirements.  
🔹 **Performance** → API is efficient and UI interactions are smooth.  
🔹 **Creativity** → Bonus features or design improvements.

---

## Submission Guidelines

1. **Push the code** to **GitHub on your profile**.
2. Include a **README.md** explaining how to run the project and any special notes you want to make us aware of.
3. **If the project cannot run on our side, it is an automatic failure.**

---

## Contact

For any questions, reach out to **thulaganyo@lortechnologies.com**.
