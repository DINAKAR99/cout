import axios from "axios";
import { getJwtToken } from "../utility/AuthorizationUtils";
export const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log(API_BASE_URL);

export const publicAxios = axios.create({
  baseURL: API_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: API_BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Using Bearer schema for JWT
      return config;
    }
  },
  (error) => Promise.reject(error)
);
