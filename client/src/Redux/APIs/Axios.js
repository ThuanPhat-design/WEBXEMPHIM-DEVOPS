import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV === 'production') {
  // Domain backend trên Vercel (API)
  baseURL = 'https://webxemphim-devops.vercel.app/api';
} else {
  // Local dev
  baseURL = 'http://localhost:5000/api';
}

const Axios = axios.create({
  baseURL,
  withCredentials: true
});

export default Axios;
