import { axiosInstance } from "./axios";

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const register = async (signUpData: object) => {
  const response = await axiosInstance.post("/auth/register", signUpData);
  return response.data;
};

export const login = async (loginData: object) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
}