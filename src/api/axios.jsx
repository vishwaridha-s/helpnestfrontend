import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// ✅ REQUEST INTERCEPTOR
// Always attach JWT if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // 🔒 Ensure headers object exists
    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR (DEBUG MODE)
// ❌ No auto logout here (very important)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(
      "AXIOS ERROR →",
      error.response?.status,
      error.config?.url
    );
    return Promise.reject(error);
  }
);

export default API;
