import React, { useState, useEffect } from 'react';
import MusicPlayer from '../common/MusicPlayer';
import '../../styles/components/MusicPage.css';

const MusicPage = () => {
  const [musicData, setMusicData] = useState(null);
  const [error, setError] = useState(null);


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
