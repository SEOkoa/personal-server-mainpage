import React, { useState, useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { login } from '../../services/authService';
import '../../styles/components/AuthDialog.css';

const AuthDialog = ({ isVisible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } = useContext(LoginContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserInfo(null);
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login(username, password);
      setIsLoggedIn(true);
      setUserInfo({
        username: response.username,
        email: response.email
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  if (isLoggedIn) {
    return (
      <div className="auth-overlay">
        <div className="auth-dialog">
          <button className="close-button" onClick={onClose}>&times;</button>
          <h2>사용자 정보</h2>
          <div className="user-info">
            <p>사용자: {userInfo?.username}</p>
            <p>이메일: {userInfo?.email}</p>
          </div>
          <button 
            className="logout-button" 
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-overlay">
      <div className="auth-dialog">
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

export default AuthDialog;
