const express = require('express');
const { connect } = require('./db/database');
const cors = require('cors');  // CORS 추가

const app = express();
app.use(cors());  // CORS 미들웨어 추가
app.use(express.json());

// 디버그용 미들웨어 추가
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const port = process.env.PORT || 3000;

// 서버 시작 전에 데이터베이스 연결 시도
try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    
    connect().then(() => {
        console.log('Database connection successful');
    }).catch(err => {
        console.error('Database connection failed:', err);
        // 데이터베이스 연결 실패해도 서버는 계속 실행
    });
} catch (error) {
    console.error('Server failed to start:', error);
}
