import React from 'react';

const ExifEditor = ({ exifData, editedExif, setEditedExif }) => {
  const handleExifChange = (field, value) => {
    setEditedExif({
      ...editedExif,
      [field]: value
    });
  };

  return (
    <div className="exif-editor">
      <div className="exif-grid">
        <div className="exif-field">
          <label>카메라</label>
          <input
            type="text"
            value={editedExif.camera || ''}
            onChange={(e) => handleExifChange('camera', e.target.value)}
          />
        </div>
        
        <div className="exif-field">
          <label>초점 거리</label>
          <input
            type="text"
            value={editedExif.focalLength || ''}
            onChange={(e) => handleExifChange('focalLength', e.target.value)}
          />
        </div>
        
        <div className="exif-field">
          <label>렌즈</label>
          <input
            type="text"
            value={editedExif.lens || ''}
            onChange={(e) => handleExifChange('lens', e.target.value)}
          />
        </div>
        
        <div className="exif-field">
          <label>조리개</label>
          <input
            type="text"
            value={editedExif.aperture || ''}
            onChange={(e) => handleExifChange('aperture', e.target.value)}
          />
        </div>
        
        <div className="exif-field">
          <label>셔터 스피드</label>
          <input
            type="text"
            value={editedExif.shutterSpeed || ''}
            onChange={(e) => handleExifChange('shutterSpeed', e.target.value)}
          />
        </div>
        
        <div className="exif-field">
          <label>ISO</label>
          <input
            type="text"
            value={editedExif.iso || ''}
            onChange={(e) => handleExifChange('iso', e.target.value)}
          />
        </div>
      </div>
      
      <div className="exif-actions">
        <button 
          className="reset-exif-button"
          onClick={() => setEditedExif({...exifData})}
        >
          원본으로 되돌리기
        </button>
      </div>
    </div>
  );
};

export default ExifEditor; 