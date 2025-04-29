import axios from "axios";

const apiRequest = axios.create({
  // baseURL: "http://localhost:8090/api",
  baseURL: "https://gorkhahomes-backend.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
