import React, { useContext, useState, useRef, useEffect } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import MusicWriteModal from '../write/MusicWriteModal';
import PhotoWriteModal from '../write/PhotoWriteModal';
import '../../styles/components/WriteButton.css';

const WriteButton = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const [expanded, setExpanded] = useState(false);
  const [musicModalOpen, setMusicModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) return null;

  const handleMainButtonClick = () => {
    setExpanded(prev => !prev);
  };

  const navigateToCategory = (category) => {
    if (category === '음악') {
      setMusicModalOpen(true);
    } else if (category === '사진') {
      setPhotoModalOpen(true);
    }
    setExpanded(false);
  };

  return (
    <>
      <div ref={containerRef} className="write-button-container">
        <button className="floating-write-button" onClick={handleMainButtonClick}>
          <span className="material-icons">edit</span>
        </button>
        <div className={`write-options ${expanded ? 'expanded' : 'collapsed'}`}>
          <button className="child-button" onClick={() => navigateToCategory('사진')}>
            <span className="material-icons">photo_camera</span>
          </button>
          <button className="child-button" onClick={() => navigateToCategory('음악')}>
            <span className="material-icons">music_note</span>
          </button>
        </div>
      </div>
      <MusicWriteModal 
        isOpen={musicModalOpen} 
        onClose={() => setMusicModalOpen(false)} 
      />
      <PhotoWriteModal 
        isOpen={photoModalOpen} 
        onClose={() => setPhotoModalOpen(false)} 
      />
    </>
  );
};

export default WriteButton;
