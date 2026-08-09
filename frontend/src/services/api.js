// Production deployment
import axios from "axios";

const api = axios.create({
  baseURL: "https://guest-review-sentiment-classifier-7zjv.onrender.com",
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

export default api;
