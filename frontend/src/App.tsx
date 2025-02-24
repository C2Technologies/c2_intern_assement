import { useEffect, useState } from "react";
import getAllTasks from "./services/tasks";

const App = () => {
  const [todoTasks, setTodoTasks] = useState([]);

  useEffect(() => {
    const fetchToDoTasks = async () => {
      try {
        const tasks = await getAllTasks();
        setTodoTasks(tasks);
      } catch (error) {
        console.error("Error fetching todo tasks:", error)
      }
    };
    fetchToDoTasks();
  }, []);

  return (
    <>
    <h2>Tasks</h2>
    {console.log(todoTasks)}
    </>
  );
};

export default App;
