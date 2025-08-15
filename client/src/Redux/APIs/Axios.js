import axios from "axios";

const API = axios.create({
  baseURL: "https://webxemphim-devops.vercel.app/api", // Đúng domain backend
  withCredentials: true, // nếu có dùng cookie/session
});

export default API;
