import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import xrossLogo from './assets/Xross logo.svg';
import settingLogo from './assets/setting icon.svg';
import MenuOverlay from './components/layout/MenuOverlay';
import LoginDialog from './components/layout/LoginDialog';
import HomePage from './components/pages/HomePage';
import MusicPage from './components/pages/MusicPage';
import PhotoPage from './components/pages/PhotoPage';
import PageInfo from './components/common/PageInfo';
import './App.css';
import './styles/global.css';
import { LoginProvider } from './contexts/LoginContext';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LoginProvider>
      <Router>
        <div className="app-container">
          <header className={`main-banner ${isScrolled ? 'scrolled' : ''}`}>
            <div className={`menu-button ${showMenu ? 'menu-active' : ''}`} onClick={() => setShowMenu(!showMenu)}>
              <div className="menu-icon"></div>
            </div>
            
            <div className="banner-title">
              <img src={xrossLogo} alt="Xross Logo" />
              <h1>Xross.kr</h1>
            </div>

            <div className="settings-button">
              <img 
                src={settingLogo} 
                alt="Settings"
                onClick={() => setShowLoginDialog(true)}
              />
            </div>
          </header>

          <MenuOverlay 
            isVisible={showMenu} 
            onClose={() => setShowMenu(false)} 
          />
          <LoginDialog 
            isVisible={showLoginDialog} 
            onClose={() => setShowLoginDialog(false)} 
          />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/music" element={<MusicPage />} />
              <Route path="/photo" element={<PhotoPage />} />
            </Routes>
          </main>

          <PageInfo />
        </div>
      </Router>
    </LoginProvider>
  );
}

export default App;
