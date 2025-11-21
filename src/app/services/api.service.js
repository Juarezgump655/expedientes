import axios from "axios";
import { manejarError } from "../utils/errorHandler";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    manejarError(error, error.response?.data?.msgError);

    return Promise.reject(error);
  }
);

export default api;
