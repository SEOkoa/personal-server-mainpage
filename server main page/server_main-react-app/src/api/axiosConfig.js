import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:5000/api'
    : '/api';  // production: 상대 경로 사용

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
