const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// 환경 변수 로그 출력 시 비밀번호를 마스킹 처리
const envVars = { ...process.env };
if (envVars.DB_PASSWORD) envVars.DB_PASSWORD = '설정됨';
console.log('환경 변수 확인:', envVars);

const app = express();

// body-parser 미들웨어를 가장 먼저 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 옵션 수정: 개발 환경과 프리뷰 환경도 허용
const corsOptions = {
  origin: ['https://xross.kr', 'http://localhost:5173'], // 5173은 vite 개발 기본 포트
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// CORS 미들웨어 적용
app.use(cors(corsOptions));

// 디버깅 미들웨어
app.use((req, res, next) => {
  console.log('API 요청:', {
    url: req.url,
    method: req.method,
    origin: req.headers.origin,
    path: req.path
  });
  next();
});

// API 라우트
app.use('/api/auth', authRoutes); // '/api/auth'로 변경

// ★ 테스트용: 직접 POST /api/auth/login 라우트를 추가하여 Node.js서버에서 호출되는지 확인
app.post('/api/auth/login', (req, res) => {
  console.log('테스트 로그인 라우트 호출됨:', req.body);
  res.json({ test: 'success', received: req.body });
});

// 상태 확인 엔드포인트도 일관성을 위해 수정
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, '../dist')));

// API 404 처리 수정 (라우트 순서 중요)
app.all('/api/*', (req, res) => {
  console.log('API 404 Not Found:', req.method, req.url);
  res.status(404).json({ 
    message: '요청한 API 엔드포인트를 찾을 수 없습니다.',
    path: req.path
  });
});

// Debug: 헬스 체크 엔드포인트 추가
app.get('/debug/health', (req, res) => {
  console.log('헬스 체크 요청:', req.url);
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 이미 추가된 Debug: 헬스 체크 엔드포인트(`/debug/health`)를 이용해
// curl http://127.0.0.1:5000/debug/health 같은 명령으로
// 서버가 정상 응답하는지 확인해보세요.

// SPA를 위한 폴백 핸들러
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error('서버 에러:', err);
  res.status(500).json({ 
    message: '서버 오류가 발생했습니다.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

// 127.0.0.1에 바인딩하여 외부 접근 이슈 방지
app.listen(PORT, '127.0.0.1', () => {
  console.log(`API 서버가 포트 ${PORT}에서 실행중입니다.`);
  console.log('환경:', process.env.NODE_ENV);
  console.log('CORS 허용된 오리진:', corsOptions.origin.join(', '));
});
