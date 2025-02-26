import React from 'react';

const ImageRatioSelector = ({ selectedRatio, setSelectedRatio, options }) => {
  return (
    <div className="image-ratio-selector">
      <div className="ratio-options">
        {options.map((option) => (
          <button
            key={option.value}
            className={`ratio-option ${selectedRatio === option.value ? 'selected' : ''}`}
            onClick={() => setSelectedRatio(option.value)}
            title={option.label}
          >
            <div className="ratio-preview" data-ratio={option.value}></div>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageRatioSelector; 