import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/MenuOverlay.css';

const MenuOverlay = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="menu-overlay">
      <div className="menu-content">
        <Link to="/" className="menu-item" onClick={onClose}>Home</Link>
        <Link to="/music" className="menu-item" onClick={onClose}>Music</Link>
        <Link to="/photo" className="menu-item" onClick={onClose}>Photo</Link>
      </div>
    </div>
  );
};

export default MenuOverlay;
