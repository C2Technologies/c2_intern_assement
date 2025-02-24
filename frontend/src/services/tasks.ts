import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";

const getAllTasks = async () => {
  const response = await axios.get(`${baseUrl}/api/tasks`);
  return response.data;
};

export default getAllTasks;
