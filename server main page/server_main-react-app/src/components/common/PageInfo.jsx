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
import nodeJsLogo from '../../assets/powered by/Node.js_logo.svg';
import pm2Logo from '../../assets/powered by/pm2-logo.png';
import mariadbLogo from '../../assets/powered by/mariadb-icon.png';
import '../../styles/components/PageInfo.css';

const SocialIcon = ({ href, icon, label }) => (
  <div className="social-icon">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={label} />
    </a>
    <p>{label}</p>
  </div>
);

const TechIcon = ({ href, icon, alt }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img src={icon} alt={alt} />
  </a>
);

const PageInfo = () => {
  return (
    <footer className="page-info">
      <div className="page-info-content">
        <div className="page-info-left">
          <h3>Powered by.</h3>
          <div className="powered-by-icons">
            <TechIcon href="https://ubuntu.com/" icon={ubuntuLogo} alt="Ubuntu" />
            <TechIcon href="https://httpd.apache.org/" icon={apacheLogo} alt="Apache" />
            <TechIcon href="https://vitejs.dev/" icon={viteLogo} alt="Vite" />
            <TechIcon href="https://developer.apple.com/documentation/musickitjs" icon={musickitLogo} alt="Musickit" />
            <TechIcon href="https://react.dev/" icon={reactLogo} alt="React" />
            <TechIcon href="https://nodejs.org/" icon={nodeJsLogo} alt="Node.js" />
            <TechIcon href="https://pm2.keymetrics.io/" icon={pm2Logo} alt="PM2" />
            <TechIcon href="https://mariadb.org/" icon={mariadbLogo} alt="MariaDB" />
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
