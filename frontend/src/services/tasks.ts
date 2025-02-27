import axios from "axios";
import { TaskCreate } from "../types/types";

const baseUrl = "http://127.0.0.1:8000/tasks";

const getAllTasks = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createTask = async (object: TaskCreate) => {
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateTask = async (taskID: number, newObject: TaskCreate) => {
  const response = await axios.put(`${baseUrl}/${taskID}`, newObject);
  return response.data;
};

const updateTaskStatus = async (taskID: number, completed: boolean) => {
  const response = await axios.patch(`${baseUrl}/${taskID}`, { completed })
  return response.data
}

const deleteTask = async (taskID: number) => {
  const response = await axios.delete(`${baseUrl}/${taskID}`);
  return response.data;
};

export { getAllTasks, createTask, updateTask, updateTaskStatus,deleteTask };
