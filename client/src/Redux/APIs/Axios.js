import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://webxemphim-devops-hbs6qkg84-thuanphat-designs-projects.vercel.app/api',
  withCredentials: true
});

export default Axios;
