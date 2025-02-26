import React from 'react';

const TitleInput = ({ title, setTitle, placeholder = "제목을 입력하세요" }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="write-title-input"
    />
  );
};

export default TitleInput; 