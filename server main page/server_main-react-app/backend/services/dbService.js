const pool = require('../config/database');

const checkConnection = async () => {
  let conn;
  try {
    console.log('DB 연결 시도...');
    conn = await pool.getConnection();
    const version = await conn.query('SELECT VERSION() as version');
    
    console.log('DB 연결 성공');
    return {
      connected: true,
      database: 'xross',
      version: version[0].version,
      message: 'MariaDB 연결 성공'
    };
  } catch (error) {
    console.error('DB 연결 실패:', error);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};

module.exports = {
  checkConnection
};
