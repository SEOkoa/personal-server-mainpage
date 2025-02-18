import React from 'react';
import '../../styles/components/MusicPlayer.css';

const MusicPlayer = () => {
  return (
    <div className="music-section">
      <div className="curation-md-container">
        <div className="playlist-container">
          <h2>Curation</h2>
          <p>🎧 Replay 2025'</p>
          <iframe 
            allow="autoplay *; encrypted-media *;"  
            height="450" 
            className="playlist-frame"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
            src="https://embed.music.apple.com/kr/playlist/replay-2025/pl.rp-dwRwSekL973R">
          </iframe>
        </div>
        <div className="playlist-container">
          <h2>MD's pick</h2>
          <p>🎧 Replay 2024'</p>
          <iframe 
            allow="autoplay *; encrypted-media *;"  
            height="450" 
            className="playlist-frame"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
            src="https://embed.music.apple.com/kr/playlist/replay-2024/pl.rp-Jxy4cb03Xp7D">
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
