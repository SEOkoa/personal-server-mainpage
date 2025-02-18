import React from 'react';
import MusicPlayer from '../common/MusicPlayer';
import '../../styles/components/MusicPage.css';

const MusicPage = () => {
  return (
    <div className="music-page">
      <div style={{ paddingTop: '100px' }}>
        <h1>Music</h1>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default MusicPage;
