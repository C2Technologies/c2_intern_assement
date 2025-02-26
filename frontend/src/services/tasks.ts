import axios from "axios";
import { TaskCreate } from "../types/types";

const baseUrl = "http://127.0.0.1:8000/tasks";


const getAllTasks = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createTask = async (object: TaskCreate) => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

export { getAllTasks, createTask};
