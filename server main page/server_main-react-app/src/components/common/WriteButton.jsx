import React, { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import '../../styles/components/WriteButton.css';

const WriteButton = () => {
  const { isLoggedIn } = useContext(LoginContext);

  if (!isLoggedIn) return null;

  return (
    <button className="floating-write-button" onClick={() => console.log('글쓰기')}>
      <span className="material-icons">edit</span>
    </button>
  );
};

export default WriteButton;
