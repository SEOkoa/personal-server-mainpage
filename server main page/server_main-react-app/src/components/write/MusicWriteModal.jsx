import React, { useState } from 'react';
import WriteModal from '../editor/WriteModal';
import TitleInput from '../editor/TitleInput';
import CategorySelector from '../editor/CategorySelector';
import EditorCore from '../editor/EditorCore';
import '../../styles/components/WriteModal.css';

const musicCategories = [
  { value: 'pop', label: '팝' },
  { value: 'rock', label: '록' },
  { value: 'hiphop', label: '힙합' },
  { value: 'jazz', label: '재즈' },
  { value: 'classical', label: '클래식' },
  { value: 'other', label: '기타' }
];

const MusicWriteModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('pop');

  const handleSubmit = async () => {
    console.log('음악 글 저장:', { 
      title, 
      content,
      category
    });
    onClose();
  };

  return (
    <WriteModal isOpen={isOpen} onClose={onClose} title="음악 글쓰기">
      <TitleInput 
        title={title} 
        setTitle={setTitle} 
        placeholder="음악 제목을 입력하세요" 
      />
      
      <CategorySelector 
        category={category} 
        setCategory={setCategory} 
        options={musicCategories} 
      />
      
      <EditorCore 
        namespace="music-editor" 
        onChange={setContent}
        placeholder="음악에 대한 감상을 자유롭게 작성해보세요..."
      />
      
      <div className="write-modal-footer">
        <button onClick={handleSubmit} className="submit-button">저장</button>
        <button onClick={onClose} className="cancel-button">취소</button>
      </div>
    </WriteModal>
  );
};

export default MusicWriteModal;
