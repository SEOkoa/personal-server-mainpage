import React from 'react';
import '../../styles/components/LoginDialog.css';

const LoginDialog = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="login-dialog">
      <div className="login-dialog-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>관리자 모드 접근</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </div>
    </div>
  );
};

export default LoginDialog;
