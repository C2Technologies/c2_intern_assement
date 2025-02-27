import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  // updateTask,
} from "./services/tasks";
import { Form } from "./components/Form";
import { Task, TaskCreate } from "./types/types";
import { TaskList } from "./components/TaskList";

const App = () => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchToDoTasks = async () => {
      try {
        const tasks = await getAllTasks();
        setTodoTasks(tasks);
      } catch (error) {
        console.error("Error fetching todo tasks:", error);
      }
    };
    fetchToDoTasks();
  }, []);

  const resetInputFields = () => {
    setTitle("");
    setDescription("");
  };

  const handleTaskSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newTask: TaskCreate = {
        title,
        description,
      };
      const createdTask = await createTask(newTask);
      setTodoTasks(todoTasks.concat(createdTask));
      resetInputFields();

      const updatedTodoTasks = await getAllTasks();
      setTodoTasks(updatedTodoTasks);
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  const changeTaskStatus = async (taskId: number, completed: boolean) => {
    const newState = !completed;

    try {
      await updateTaskStatus(taskId, newState);

      const updatedTodoTasks = await getAllTasks();
      setTodoTasks(updatedTodoTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodoTask = async (taskId: number, taskTitle: string) => {
    const confirmTaskDeletion = window.confirm(
      `Delete ${taskTitle} from your to-do list?`
    );

    if (!confirmTaskDeletion) {
      return;
    }

    try {
      await deleteTask(taskId);
      setTodoTasks((previousTodoTasks) =>
        previousTodoTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Tasks</h2>
      <Form
        title={title}
        description={description}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleDescriptionChange={({ target }) => setDescription(target.value)}
        handleSubmit={handleTaskSubmit}
      />
      <h2>Task List</h2>
      <TaskList
        tasks={todoTasks}
        handleStatusChange={changeTaskStatus}
        handleTaskDeletion={deleteTodoTask}
      />
    </>
  );
};

export default App;
