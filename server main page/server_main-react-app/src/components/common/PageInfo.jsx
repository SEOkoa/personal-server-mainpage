import React from 'react';
import xrossLogo from '../../assets/Xross logo.svg';
import SocialLinks from './SocialLinks';
import PoweredBy from './PoweredBy';
import '../../styles/components/PageInfo.css';

const PageInfo = () => {
  return (

   
    <footer className="page-info">
        <hr />
      <h2 className="made-by">
        Made by <img src={xrossLogo} alt="Xross Logo" /> Seo.koa
      </h2>
      <SocialLinks />
      <PoweredBy />
    </footer>
  );
};

export default PageInfo;
