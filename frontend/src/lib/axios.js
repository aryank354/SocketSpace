import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "https://socketspace-xdra.onrender.com/api"
    : "https://socketspace-xdra.onrender.com/api", // same for production
  withCredentials: true,
});
