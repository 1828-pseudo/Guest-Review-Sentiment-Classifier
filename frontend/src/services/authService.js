import api from "./api";

const API = "/api/auth";

export const registerUser = async (userData) => {
  const response = await api.post(`${API}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post(`${API}/login`, userData);

  localStorage.setItem("token", response.data.access_token);

  if (response.data.username) {
    localStorage.setItem("username", response.data.username);
  }

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

export const getToken = () => {
  return localStorage.getItem("token");
};