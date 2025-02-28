import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTask,
} from "./services/tasks";
import { Form } from "./components/Form";
import { Task, TaskCreate } from "./types/types";
import { TaskList } from "./components/TaskList";
import { ToggleForm } from "./components/ToggleForm";

const App = () => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);

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

  const handleTaskEdit = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTaskId(task.id);

    setFormVisible(true);
  };

  const handleTaskSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const taskData: TaskCreate = {
        title,
        description,
      };

      if (editingTaskId !== null) {
        await updateTask(editingTaskId, taskData);
        setEditingTaskId(null);
      } else {
        await createTask(taskData);
      }

      resetInputFields();
      const updatedTodoTasks = await getAllTasks();
      setTodoTasks(updatedTodoTasks);
    } catch (error) {
      console.error(error);
    }
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
      <ToggleForm
        buttonLabel={editingTaskId !== null ? "Edit Task" : "Add new Task"}
        onCancel={resetInputFields}
        isVisible={formVisible}
        setIsVisible={setFormVisible}
      >
        <Form
          title={title}
          description={description}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleDescriptionChange={({ target }) => setDescription(target.value)}
          handleSubmit={handleTaskSubmit}
          submitButtonText={editingTaskId !== null ? "Update" : "Add"}
        />
      </ToggleForm>
      <h2>Task List</h2>
      <TaskList
        tasks={todoTasks}
        handleStatusChange={changeTaskStatus}
        handleTaskDeletion={deleteTodoTask}
        handleTaskEdit={handleTaskEdit}
      />
    </>
  );
};

export default App;
