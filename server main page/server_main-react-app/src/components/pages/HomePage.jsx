import React from 'react';
import MusicPlayer from '../common/MusicPlayer';
import PhotoSlider from '../common/PhotoSlider';
import '../../styles/components/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <MusicPlayer />
      <hr />
      <PhotoSlider />
    </div>
  );
};

export default HomePage;
