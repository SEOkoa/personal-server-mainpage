import React, { useState, useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { login } from '../../services/authService';
import '../../styles/components/LoginDialog.css';

const LoginDialog = ({ isVisible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setUserInfo } = useContext(LoginContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('로그인 시도:', { username });
      const response = await login(username, password);
      console.log('로그인 성공:', response);
      
      setIsLoggedIn(true);
      setUserInfo({
        username: response.username,
        email: response.email
      });
      onClose();
    } catch (err) {
      console.error('로그인 실패:', err);
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="login-overlay">
      <div className="login-dialog">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>로그인</h2>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="사용자명"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;
