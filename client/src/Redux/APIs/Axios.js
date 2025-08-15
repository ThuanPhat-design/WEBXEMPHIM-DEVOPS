import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://webxemphim-devops-jv4zm8kx7-thuanphat-designs-projects.vercel.app" // domain cố định backend
    : "http://localhost:5000/api";

const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export default Axios;
