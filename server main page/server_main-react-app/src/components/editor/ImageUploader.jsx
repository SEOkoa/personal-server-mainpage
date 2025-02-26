import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div 
      {...getRootProps()} 
      className={`image-dropzone ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ color: '#eee' }}>이미지를 여기에 놓으세요...</p>
      ) : (
        <div className="upload-prompt">
          <span className="material-icons upload-icon">add_photo_alternate</span>
          <p style={{ color: '#eee' }}>이미지를 드래그하여 업로드하세요</p>
          <p className="upload-subtitle">또는 클릭하여 파일 선택</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 