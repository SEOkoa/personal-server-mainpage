import bcrypt from 'bcrypt';
import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;

async function createUser(username, email, password) {
  const connection = await createConnection({
    host: process.env.VITE_MARIADB_HOST,
    user: process.env.VITE_MARIADB_USER,
    password: process.env.VITE_MARIADB_PASSWORD,
    database: process.env.VITE_MARIADB_DATABASE
  });

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    await connection.execute(
      'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [username, email, hashedPassword]
    );

    console.log('사용자가 성공적으로 생성되었습니다.');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('이미 존재하는 사용자명 또는 이메일입니다.');
    } else {
      console.error('사용자 생성 실패:', error);
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
