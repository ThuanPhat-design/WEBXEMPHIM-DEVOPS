import axios from 'axios';

const Axios = axios.create({
  baseURL: 
    process.env.NODE_ENV === 'production'
      ? 'https://webxemphim-devops-hbs6qkg84-thuanphat-designs-projects.vercel.app/api' // backend Vercel
      : 'http://localhost:5000/api', // local dev
  withCredentials: true
});

export default Axios;
