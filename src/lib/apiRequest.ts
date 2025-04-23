import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8090/api",
  withCredentials: true,
});

export default apiRequest;