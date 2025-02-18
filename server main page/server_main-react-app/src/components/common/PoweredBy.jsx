import React from 'react';
import ubuntuLogo from '../../assets/ubuntu icon.png';
import apacheLogo from '../../assets/powered by/apache-icon.png';
import viteLogo from '../../assets/powered by/vite.svg';
import musickitLogo from '../../assets/powered by/apple-music-media-api-128x128_2x.png';
import reactLogo from '../../assets/react.svg';
import '../../styles/components/PoweredBy.css';

const PoweredBy = () => (
  <div className="powered-by-section">
    <h2 className="powered-by-text">Powered by.</h2>
    <div className="powered-by-icons">
      <img src={ubuntuLogo} alt="Ubuntu" />
      <img src={apacheLogo} alt="Apache" />
      <img src={viteLogo} alt="Vite" />
      <img src={musickitLogo} alt="Musickit" />
      <img src={reactLogo} alt="React" />
    </div>
  </div>
);

export default PoweredBy;
