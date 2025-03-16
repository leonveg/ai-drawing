import React, { useState } from 'react';
import { Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LoginModal from './LoginModal';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed w-full top-0 z-50 bg-opacity-90 backdrop-blur-sm border-b border-amber-700/20"
        style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="/" className="flex items-center gap-2">
              <span className="british-heading text-2xl">Raphael AI</span>
            </a>
            
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={scrollToFeatures} className="british-nav-link">功能</button>
              <a href="#faq" className="british-nav-link">常见问题</a>
              <a href="#pricing" className="british-nav-link">定价</a>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe size={20} />
              <span>简体中文</span>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="british-button"
            >
              登录
            </button>
          </div>
        </div>
      </header>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header