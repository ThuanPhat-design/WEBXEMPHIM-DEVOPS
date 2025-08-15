import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://webxemphim-devops.vercel.app/api" // domain cố định backend
    : "http://localhost:5000/api";

const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export default Axios;
