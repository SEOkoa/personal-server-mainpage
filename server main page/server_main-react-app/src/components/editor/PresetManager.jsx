import React, { useState } from 'react';

const PresetManager = ({ presets, selectedPreset, onSavePreset, onLoadPreset }) => {
  const [newPresetName, setNewPresetName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSavePreset = () => {
    if (newPresetName.trim()) {
      onSavePreset(newPresetName.trim());
      setNewPresetName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="preset-manager">
      <div className="preset-list">
        {presets.length > 0 ? (
          presets.map(preset => (
            <button
              key={preset.id}
              className={`preset-item ${selectedPreset === preset.id ? 'selected' : ''}`}
              onClick={() => onLoadPreset(preset.id)}
            >
              {preset.name}
            </button>
          ))
        ) : (
          <p className="no-presets">저장된 프리셋이 없습니다</p>
        )}
      </div>
      
      {isCreating ? (
        <div className="create-preset">
          <input
            type="text"
            placeholder="프리셋 이름"
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
          />
          <button 
            className="save-preset-button"
            onClick={handleSavePreset}
            disabled={!newPresetName.trim()}
          >
            저장
          </button>
          <button 
            className="cancel-preset-button"
            onClick={() => setIsCreating(false)}
          >
            취소
          </button>
        </div>
      ) : (
        <button 
          className="create-preset-button"
          onClick={() => setIsCreating(true)}
        >
          새 프리셋 만들기
        </button>
      )}
    </div>
  );
};

export default PresetManager; 