// utils/axiosConfig.js
import axios from "axios";
import { active_base_url } from "./config";

const api = axios.create({
  baseURL: active_base_url || "http://localhost:3000/",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Handle auth errors, maybe redirect
    }
    return Promise.reject(err);
  }
);

export default api;
