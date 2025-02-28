import { useEffect, useState } from "react";

const UseTasks = () => {
  const [tasks, setTasks] = useState();
  useEffect(() => {
    const getTasks = async () => {
      await fetch("http://localhost:8000/tasks")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTasks(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    };

    getTasks();
  }, []);

  return tasks;
};

export default UseTasks;
