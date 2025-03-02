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
import { TaskSkeleton } from "./components/TaskSkeleton";

const App = () => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("ALL");
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchToDoTasks = async () => {
      setInitialLoading(true);
      try {
        const cachedData = localStorage.getItem("todoTasks");
        const cacheTimestamp = localStorage.getItem("todoTasksTimestamp");
        const now = new Date().getTime();

        if (
          cachedData &&
          cacheTimestamp &&
          now - parseInt(cacheTimestamp) < 5 * 60 * 1000
        ) {
          setTodoTasks(JSON.parse(cachedData));
          setInitialLoading(false);
          getAllTasks().then((tasks) => {
            setTodoTasks(tasks);
            localStorage.setItem("todoTasks", JSON.stringify(tasks));
            localStorage.setItem("todoTasksTimestamp", now.toString());
          });
        } else {
          const tasks = await getAllTasks();
          setTodoTasks(tasks);
          localStorage.setItem("todoTasks", JSON.stringify(tasks));
          localStorage.setItem("todoTasksTimestamp", now.toString());
        }
      } catch (error) {
        console.error("Error fetching todo tasks:", error);
      } finally {
        setInitialLoading(false);
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
    setLoading(true);

    try {
      const taskData: TaskCreate = {
        title,
        description,
      };

      if (editingTaskId !== null) {
        await updateTask(editingTaskId, taskData);
        setEditingTaskId(null);
        setFormVisible(false);
      } else {
        await createTask(taskData);
        setFormVisible(false);
      }

      resetInputFields();
      const updatedTodoTasks = await getAllTasks();
      setTodoTasks(updatedTodoTasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    if (currentFilter === "ALL") {
      return true;
    }
    if (currentFilter === "COMPLETED") {
      return task.completed;
    }
    if (currentFilter === "PENDING") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">To-Do Task Manager</h1>
        <div className="app-controls">
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
              handleDescriptionChange={({ target }) =>
                setDescription(target.value)
              }
              handleSubmit={handleTaskSubmit}
              submitButtonText={editingTaskId !== null ? "Update" : "Add"}
              loading={loading}
            />
          </ToggleForm>
          <FilterRadioInputs
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="tasks-section">
          {initialLoading ? (
            <TaskSkeleton count={5} />
          ) : (
            <TaskList
              tasks={filteredTasks}
              handleStatusChange={changeTaskStatus}
              handleTaskDeletion={deleteTodoTask}
              handleTaskEdit={handleTaskEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
