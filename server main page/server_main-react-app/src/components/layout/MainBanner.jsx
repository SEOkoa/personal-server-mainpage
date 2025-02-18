import React from 'react';
import xrossLogo from '../../assets/Xross logo.svg';
import settingLogo from '../../assets/setting icon.svg';
import './MainBanner.css';  // 경로 수정

const MainBanner = ({ isScrolled, onMenuClick, onLoginClick }) => {
  return (
    <div className={`main-banner ${isScrolled ? 'scrolled' : ''}`}>
      <div className="menu-button" onClick={onMenuClick}>
        <div className="menu-icon"></div>
      </div>
      
      <div className="banner-center">
        <img src={xrossLogo} alt="Xross Logo" />
        <h1 className="main-banner-text">Xross.kr</h1>
      </div>

      <div className="settings-container">
        <img 
          src={settingLogo} 
          alt="Settings"
          onClick={onLoginClick} 
        />
      </div>
    </div>
  );
};

export default MainBanner;
