import React, { useEffect, useState } from "react";
import { getAllTasks, createTask } from "./services/tasks";
import { Form } from "./components/Form";
import { Task, TaskCreate } from "./types/types";

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
      {console.log(todoTasks)}
    </>
  );
};

export default App;
