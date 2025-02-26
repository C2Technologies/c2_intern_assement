import React, { useEffect, useState } from "react";
import getAllTasks from "./services/tasks";
import { Form } from "./components/Form";

interface Task {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string | null;
}

const App = () => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

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

  // const resetInputFields = () => {
  //   setTitle("");
  //   setTitle("");
  // };

  
  const handleTaskSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    return null;
  };




  return (
    <>
      <h2>Tasks</h2>
      <Form
        title={title}
        content={content}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleContentChange={({ target }) => setContent(target.value)}
        handleSubmit={handleTaskSubmit}
      />
      {console.log(todoTasks)}
    </>
  );
};

export default App;
