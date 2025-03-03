import { Todo } from "../models/Task";
import { BACKEND_ROOT } from "../assets/statics";

const createTodo = async (todo: Todo) => {
  try {
    const response = await fetch(`${BACKEND_ROOT}task/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    alert("Todo created successfully");

    return await response.json();
  } catch (error) {
    console.error("Create Todo Error:", error);
    throw error;
  }
};

const updateTodo = async (todo: Todo) => {
  try {
    const response = await fetch(`${BACKEND_ROOT}task/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    alert("Todo updated successfully");

    return await response.json();
  } catch (error) {
    console.error("Update Todo Error:", error);
    throw error;
  }
};

const deleteTodo = async (todoId: number) => {
  try {
    const response = await fetch(`${BACKEND_ROOT}task/${todoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    alert("Todo deleted successfully");

    return await response.json();
  } catch (error) {
    console.error("Delete Todo Error:", error);
    throw error;
  }
};

export { deleteTodo, createTodo, updateTodo };
