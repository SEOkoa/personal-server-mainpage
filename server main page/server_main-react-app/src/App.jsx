import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import reactLogo from './assets/react.svg';
import './App.css';

import apacheLogo from './assets/ubuntu icon.png';
import photoBannerPre from './assets/일상 - ARCO7858 .jpg';
import festivalPhoto from './assets/축제날 - 009.png';
import settingLogo from './assets/setting icon.svg';
import blogIcon from './assets/blog-icon.svg';
import instagramIcon from './assets/instagram-icon.svg';
import githubIcon from './assets/github-icon.png';

function App() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <div className="main-banner">
        <h1 className="main-banner-text">Xross.kr</h1>
      </div>

      <div className="icon-container">
        <div className="icon-container-left">
          <div className="icon-button">
            <a href="https://blog.xross.kr">
              <img src={blogIcon} alt="Blog" />
            </a>
            <p>blog</p>
          </div>
          <div className="icon-button">
            <a href="https://github.com/seokoa">
              <img src={githubIcon} alt="GitHub" />
            </a>
            <p>github</p>
          </div>
        </div>
        <div className="icon-container-right">
          <div className="icon-button">
            <a href="https://www.instagram.com/seo.koa/">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <p>@seo.koa</p>
          </div>
          <div className="icon-button">
            <a href="https://www.instagram.com/xross.koa/">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <p>@xross.koa</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="curation-md-container">
        <div style={{ width: '100%', height: '100%' }}>
          <h1 style={{ textAlign: 'left' }}>Curation</h1>
          <p style={{ textAlign: 'left' }}>🎧 Replay 2025' <br/>(하위 사이트 구현중으로 당분간 '개발자가 올해 가장 많이 들은 노래' 플리가 제공됩니다.)</p>
          <iframe 
            allow="autoplay *; encrypted-media *;"  
            height="450" 
            style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', background: 'dark' }} 
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
            src="https://embed.music.apple.com/kr/playlist/replay-2025/pl.rp-dwRwSekL973R">
          </iframe>
        </div>
      
        <div style={{ width: '100%', height: '100%' }}>
          <h1 style={{ textAlign: 'left' }}>MD's pick</h1>
          <p style={{ textAlign: 'left' }}>🎧 Replay 2024'<br/> (위와 같은 이유로 당분간 '개발자가 작년에 가장 많이 들은 노래' 플리가 제공됩니다.)</p>
          <iframe 
            allow="autoplay *; encrypted-media *;"  
            height="450" 
            style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', background: 'dark' }} 
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
            src="https://embed.music.apple.com/kr/playlist/replay-2024/pl.rp-Jxy4cb03Xp7D">
          </iframe>
        </div>
      </div>

      <hr />

      <div style={{ width: '100%', height: '100%' }}>
        <h1 style={{ textAlign: 'left' }}>Photo</h1>
        <Slider {...settings}>
          <div>
            <img src={photoBannerPre} className='Img Banner' alt="Photo Banner 1" />
          </div>
          <div>
            <img src={festivalPhoto} className='Img Banner' alt="Photo Banner 2" />
          </div>
        </Slider>
      </div>

      <hr />
      
      <div> {/* 하단 인포 */}
        <div style={{ width: '100%', height: '100%', textAlign: 'left', paddingLeft: '20px' }}>
          <h1>Info.</h1>
          <div className="info-item">
            <img src={apacheLogo} className="logo apache" alt="Apache logo" />
            <p>Apache is running!</p>
          </div>

          <div className="info-item">
            <img src={reactLogo} className="logo react" alt="React logo" />
            <p>Powered by React.</p>
          </div>

          <div className="info-item">
            <img src={settingLogo} className="logo setting" alt="setting logo" />
            <p>관리자 페이지</p>
          </div>
        </div>
      </div> 
    
    </>
  );
}

{/* 슬라이더 화살표 커스텀 */}
function SampleNextArrow(props) {      
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '10px' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '10px', zIndex: 1 }}
      onClick={onClick}
    />
  );
}

export default App;
