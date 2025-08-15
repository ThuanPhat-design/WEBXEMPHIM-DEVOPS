import axios from 'axios';

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://webxemphim-devops.vercel.app/api'
      : 'http://localhost:5000/api',
  withCredentials: true
});

export default Axios;
