import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
// For development: http://localhost:3000/api
// For production: set NEXT_PUBLIC_API_URL=/api or https://ym-diary.vercel.app/api in Vercel

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Try to get token from cookie first, then localStorage
    let token = Cookies.get("authToken");
    if (!token) {
      token = localStorage.getItem("authToken") || "";
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth tokens and user data
      Cookies.remove("authToken");
      try {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      } catch (e) {
        // Silent error
      }
      // Redirect to login only if not already there
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
