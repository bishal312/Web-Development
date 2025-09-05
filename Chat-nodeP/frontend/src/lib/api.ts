import { axiosInstance } from "./axios";

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const register = async (signUpData: {
  username: string;
  email: string;
  password: string;
  role: string;
  profilePic?: File | null;
}) => {
  const formData = new FormData();
  formData.append("username", signUpData.username);
  formData.append("email", signUpData.email);
  formData.append("password", signUpData.password);
  formData.append("role", signUpData.role);
  if (signUpData.profilePic) {
    formData.append("profilePic", signUpData.profilePic);
  }

  const response = await axiosInstance.post("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const login = async (loginData: object) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const getStreamToken = async () =>{
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}