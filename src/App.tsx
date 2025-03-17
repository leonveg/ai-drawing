import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';
import Gallery from './components/Gallery';
import Features from './components/Features';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import MouseFog from './components/MouseFog';

function App() {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
      >
        <MouseFog />
        <Header />

        {/* Hero Section */}
        <section className="text-center pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4">
            <h1
              className="british-heading text-4xl md:text-5xl mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              几秒钟内创建令人惊叹的AI生成图像
            </h1>
            <p
              className="text-lg british-accent mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              🌟 世界首个免费无限制AI图像生成器 🌟
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-amber-900/30 text-amber-500 px-4 py-1 rounded-none">
                100% 免费
              </span>
              <span className="bg-amber-900/30 text-amber-500 px-4 py-1 rounded-none">
                由 Flux-1-Dev 模型提供支持
              </span>
              <span className="bg-amber-900/30 text-amber-500 px-4 py-1 rounded-none">
                无需登录
              </span>
              <span className="bg-amber-900/30 text-amber-500 px-4 py-1 rounded-none">
                无限生成
              </span>
            </div>
          </div>
        </section>

        <div className="space-y-16">
          <ImageGenerator />
          <Gallery />
          <Features />
          <Stats />
          <Testimonials />
          <FAQ />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;