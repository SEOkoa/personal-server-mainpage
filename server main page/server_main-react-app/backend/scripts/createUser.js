const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

// .env 파일 위치 지정
dotenv.config({ path: path.join(__dirname, '../.env') });

const SALT_ROUNDS = 10;

async function createUser(username, email, password) {
  // 환경변수 이름 수정
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  });

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log('생성된 해시:', hashedPassword);
    
    // 사용자 추가
    const [result] = await connection.execute(
      'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [username, email, hashedPassword]
    );

    console.log('✅ 사용자가 성공적으로 생성되었습니다.');
    console.log('사용자 ID:', result.insertId);
    
    // 생성된 사용자 정보 확인
    const [users] = await connection.execute(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [result.insertId]
    );
    
    console.log('생성된 사용자 정보:', users[0]);

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('❌ 이미 존재하는 사용자명 또는 이메일입니다.');
    } else {
      console.error('❌ 사용자 생성 실패:', error);
    }
  } finally {
    await connection.end();
  }
}

// 커맨드 라인에서 실행
const [,, username, email, password] = process.argv;
if (!username || !email || !password) {
  console.error('사용법: node createUser.js <username> <email> <password>');
  process.exit(1);
}

createUser(username, email, password);
