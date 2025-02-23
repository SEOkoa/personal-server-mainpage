const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// 디버깅 미들웨어
router.use((req, res, next) => {
  const { password, ...safeBody } = req.body;
  console.log('Auth 라우트 요청:', {
    path: req.path,
    method: req.method,
    body: { ...safeBody, password: '****' }
  });
  next();
});

router.post('/login', async (req, res) => {
  console.log('로그인 엔드포인트 호출됨');
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: '사용자명과 비밀번호는 필수입니다.' });
  }

  try {
    console.log('로그인 요청 받음:', { username });

    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      console.log('사용자 없음:', username);
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password);
    
    console.log('비밀번호 검증:', { isValid, username });

    if (!isValid) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('로그인 성공:', { username });

    res.json({
      token,
      username: user.username,
      email: user.email
    });

  } catch (error) {
    console.error('로그인 처리 중 에러:', error);
    res.status(500).json({ 
      message: '서버 오류가 발생했습니다.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ isValid: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ isValid: true, user: decoded });
  } catch (error) {
    res.json({ isValid: false });
  }
});

module.exports = router;
