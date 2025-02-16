import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import reactLogo from './assets/react.svg';
import './App.css';

import ubuntuLogo from './assets/ubuntu icon.png';
import photoBannerPre from './assets/일상 - ARCO7858 .jpg';
import festivalPhoto from './assets/축제날 - 009.png';
import settingLogo from './assets/setting icon.svg';
import blogIcon from './assets/blog-icon.svg';
import instagramIcon from './assets/instagram-icon.svg';
import githubIcon from './assets/github-icon.png';

import viteLogo from './assets/powered by/vite.svg';
import apacheLogo from './assets/powered by/apache-icon.png';
import musickitLogo from './assets/powered by/apple-music-media-api-128x128_2x.png'
import xrossLogo from './assets/xross logo.svg';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const handleLoginClick = () => {
    setShowLoginDialog(true);
  };

  const handleCloseDialog = () => {
    setShowLoginDialog(false);
  };

  return (
    <>
      <div className={`main-banner ${isScrolled ? 'scrolled' : ''}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100vw', height: '50px', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={xrossLogo} alt="Xross Logo" style={{ height: '30px', marginRight: '10px' }} />
          <h1 className="main-banner-text" style={{ margin: 0 }}>Xross.kr</h1>
        </div>
        <div className="main-banner-icons">
          <a href="https://blog.xross.kr">
            <img src={blogIcon} alt="Blog" style={{ height: '30px', marginLeft: '10px' }} />
          </a>
          <a href="https://github.com/seokoa">
            <img src={githubIcon} alt="GitHub" style={{ height: '30px', marginLeft: '10px' }} />
          </a>
          <img src={settingLogo} alt="Settings" style={{ height: '30px', marginLeft: '10px', marginRight: '30px', cursor: 'pointer' }} onClick={handleLoginClick} />
        </div>
      </div>

      {showLoginDialog && (
        <div className="login-dialog">
          <div className="login-dialog-content">
            <span className="close" onClick={handleCloseDialog}>&times;</span>
            <h2>관리자 모드 접근</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </div>
        </div>
      )}

      <div id="music" style={{ paddingTop: '100px' }}> {/* Adjust padding to prevent content overlap */}
        <div className="icon-container">
          <div className="icon-container-left">
            <div className="icon-button">
            </div>
          </div>
        </div>
        <hr />
        <div className="curation-md-container">
          <div style={{ width: '100%', height: '100%' }}>
            <h2 style={{ textAlign: 'left' }}>Curation</h2>
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
            <h2 style={{ textAlign: 'left' }}>MD's pick</h2>
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
      </div>
      <hr />
      <div id="photo" style={{ width: '100%', height: '100%' }}>
        <h2 style={{ textAlign: 'left' }}>Photo</h2>
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
        
        </div>
      </div> 

      <div style={{ textAlign: 'center', fontFamily: 'Gothic, sans-serif', marginTop: '20px' }}>
        <h2>Made by <img src={xrossLogo} alt="Xross Logo" style={{ height: '30px', verticalAlign: 'middle' }} /> Seo.koa</h2>
        
        <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
                <a href="https://www.instagram.com/seo.koa/">
                  <img src={instagramIcon} alt="Instagram" style={{ height: '30px'}} />
                </a>
                <p style={{ margin: '0' }}>@seo.koa</p>
              </div>
            </td>
            <td style={{ padding: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
                <a href="https://www.instagram.com/xross.koa/">
                  <img src={instagramIcon} alt="Instagram" style={{ height: '30px'}} />
                </a>
                <p style={{ margin: '0' }}>@xross.koa</p>
              </div>
            </td>
          </tr>
        </table>
        <h2>Powered by.</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <img src={ubuntuLogo} alt="Ubuntu" style={{ height: '50px' }} />
          <img src={apacheLogo} alt="Apache" style={{ height: '50px' }} />
          <img src={viteLogo} alt="Vite" style={{ height: '50px' }} />
          <img src={musickitLogo} alt="Musickit" style={{ height: '50px' }} />
          <img src={reactLogo} alt="React" style={{ height: '50px' }} />
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
