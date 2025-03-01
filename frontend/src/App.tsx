import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTask,
} from "./services/tasks";
import { Form } from "./components/Form";
import { FilterType, Task, TaskCreate } from "./types/types";
import { TaskList } from "./components/TaskList";
import { ToggleForm } from "./components/ToggleForm";
import { FilterRadioInputs } from "./components/FilterRadioInputs";

const App = () => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("ALL");

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

  const handleFilterChange = (filterType: FilterType) => {
    setCurrentFilter(filterType);
  };

  const filteredTasks = todoTasks.filter((task) => {
    if (currentFilter === "ALL") return true;
    if (currentFilter === "COMPLETED") return task.completed;
    if (currentFilter === "PENDING") return !task.completed;
    return true;
  });

  return (
    <>
      <ToggleForm
        buttonLabel="Add new Task"
        onCancel={resetInputFields}
        isVisible={formVisible}
        setIsVisible={setFormVisible}
        taskTitle={editingTaskId !== null ? title : "New Task"}
        taskDate={
          editingTaskId !== null &&
          todoTasks.find((task) => task.id === editingTaskId)?.createdAt
            ? new Date(
                todoTasks.find((task) => task.id === editingTaskId)
                  ?.createdAt || ""
              ).toLocaleDateString()
            : new Date().toLocaleDateString()
        }
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
      {/* <FilterRadioInputs
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
      /> */}
      <TaskList
        tasks={filteredTasks}
        handleStatusChange={changeTaskStatus}
        handleTaskDeletion={deleteTodoTask}
        handleTaskEdit={handleTaskEdit}
      />
    </>
  );
};

export default App;
