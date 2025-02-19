import React from 'react';
import xrossLogo from '../../assets/Xross logo.svg';
import instagramIcon from '../../assets/instagram-icon.svg';
import blogIcon from '../../assets/blog-icon.svg';
import githubIcon from '../../assets/github-icon.png';
import ubuntuLogo from '../../assets/ubuntu icon.png';
import apacheLogo from '../../assets/powered by/apache-icon.png';
import viteLogo from '../../assets/powered by/vite.svg';
import musickitLogo from '../../assets/powered by/apple-music-media-api-128x128_2x.png';
import reactLogo from '../../assets/react.svg';
import '../../styles/components/PageInfo.css';

const SocialIcon = ({ href, icon, label }) => (
  <div className="social-icon">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={label} />
    </a>
    <p>{label}</p>
  </div>
);

const PageInfo = () => {
  return (
    <footer className="page-info">
      <hr />
      <div className="page-info-content">
        <div className="page-info-left">
          <h3>Powered by.</h3>
          <div className="powered-by-icons">
            <img src={ubuntuLogo} alt="Ubuntu" />
            <img src={apacheLogo} alt="Apache" />
            <img src={viteLogo} alt="Vite" />
            <img src={musickitLogo} alt="Musickit" />
            <img src={reactLogo} alt="React" />
          </div>
        </div>

        <div className="page-info-right">
          <h3 className="made-by">
            Made by <img src={xrossLogo} alt="Xross Logo" /> Seo.koa
          </h3>
          <div className="social-links">
            <SocialIcon href="https://www.instagram.com/seo.koa/" icon={instagramIcon} label="@seo.koa" />
            <SocialIcon href="https://www.instagram.com/xross.koa/" icon={instagramIcon} label="@xross.koa" />
            <SocialIcon href="https://blog.xross.kr" icon={blogIcon} label="Blog" />
            <SocialIcon href="https://github.com/seokoa" icon={githubIcon} label="GitHub" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageInfo;
