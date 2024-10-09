import axios from "axios";
import { getJwtToken } from "../Utility/AuthorizationUtils";
export const API_BASE_URL = process.env.REACT_APP_API_URL;

export const publicAxios = axios.create({
  baseURL: API_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: API_BASE_URL,
});

//   interceptor
privateAxios.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token) {
      // Add Authorization header if token exists
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default publicAxios;
