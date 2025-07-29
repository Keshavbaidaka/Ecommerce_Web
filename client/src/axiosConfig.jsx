
// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, // change to true if using cookies
});

export default instance;
