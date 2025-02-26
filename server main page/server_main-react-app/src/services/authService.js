import axios from 'axios';

// API URL 설정 명확화
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://127.0.0.1:5000/api'
  : 'https://xross.kr/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false  // 혼합 컨텐츠 문제 해결을 위해 false로 설정
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  config => {
    console.log('요청 설정:', config);
    return config;
  },
  error => {
    console.error('요청 에러:', error);
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  try {
    console.log('로그인 시도:', { username, url: `${API_URL}/auth/login` });
    
    const response = await axiosInstance.post('/auth/login', {
      username,
      password
    });
    
    console.log('서버 응답:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
    }
    return response.data;
  } catch (error) {
    console.error('로그인 에러 상세:', {
      config: error.config,
      message: error.message,
      response: error.response,
      stack: error.stack
    });
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data.isValid;
  } catch {
    localStorage.removeItem('token');
    return false;
  }
};
