import axios from "axios";
import { getToken, getUserId } from "../auth";
export const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log(API_BASE_URL);

export const myAxios = axios.create({
  baseURL: API_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: API_BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Using Bearer schema for JWT
      return config;
    }
  },
  (error) => Promise.reject(error)
);
