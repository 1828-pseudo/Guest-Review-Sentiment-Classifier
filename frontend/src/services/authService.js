import api from "../services/api";

const API = "http://127.0.0.1:8000/api/auth";

export const registerUser = async (userData) => {
  const response = await api.post(`${API}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post(`${API}/login`, userData);

  localStorage.setItem("token", response.data.access_token);

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};