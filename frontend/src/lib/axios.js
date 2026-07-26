import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const setupInterceptor = (getToken) => {
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Request never reached the server — no internet, DNS failure, or backend fully down
      if (!navigator.onLine) {
        toast.error("You're offline. Reconnect and try again.");
      } else {
        toast.error("Couldn't reach the server. Please try again shortly.");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
