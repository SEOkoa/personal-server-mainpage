
import React from 'react';
import PhotoSlider from '../common/PhotoSlider';
import '../../styles/components/PhotoPage.css';

const PhotoPage = () => {
  return (
    <div className="photo-page">
      <div style={{ paddingTop: '100px' }}>
        <h1>Photo</h1>
        <PhotoSlider />
      </div>
    </div>
  );
};

export default PhotoPage;