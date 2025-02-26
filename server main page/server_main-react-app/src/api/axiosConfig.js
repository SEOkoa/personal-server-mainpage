import axios from 'axios';

// 개발 모드에서는 항상 프록시 사용
const baseURL = '/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// 디버깅용 인터셉터 추가
axiosInstance.interceptors.request.use(config => {
  console.log('API 요청:', config.method.toUpperCase(), config.url);
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API 오류:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
