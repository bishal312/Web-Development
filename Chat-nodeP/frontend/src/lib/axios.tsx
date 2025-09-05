import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true
// })

export const axiosInstance = axios.create({
  baseURL: "https://nepalipool.onrender.com", // <-- your deployed backend
  withCredentials: true, // if using cookies / sessions
});
