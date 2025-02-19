import React, { useState } from 'react';
import { useLogin } from '../../contexts/LoginContext';
import '../../styles/components/LoginDialog.css';

const LoginDialog = ({ isVisible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(username, password);
    if (result.success) {
      onClose();
      setUsername('');
      setPassword('');
    } else {
      setError('로그인에 실패했습니다.');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="login-dialog">
      <form className="login-dialog-content" onSubmit={handleSubmit}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>관리자 모드 접근</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginDialog;
