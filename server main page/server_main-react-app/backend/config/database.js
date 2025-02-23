const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ 
  path: path.resolve(__dirname, '../.env')
});

console.log('환경 변수 확인:', {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: process.env.DB_PORT
});

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false  // SSL 검증 비활성화
  }
};

console.log('DB 설정 확인:', {
  ...config,
  password: config.password ? '설정됨' : '설정안됨'
});

const pool = mysql.createPool(config);

// 연결 테스트
pool.getConnection()
  .then(connection => {
    console.log('DB 연결 성공');
    connection.release();
  })
  .catch(err => {
    console.error('DB 연결 실패:', err);
    process.exit(1);
  });

module.exports = pool;
