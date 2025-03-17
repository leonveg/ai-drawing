import React from 'react';
import { Image } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-color)',
      }}
      className="border-t mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex items-center gap-2">
              <Image className="w-8 h-8" />
              <span
                className="text-xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Raphael AI
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
              Raphael AI: 由 FLUX-1-Dev 驱动的免费、无限制 AI
              图像生成器。无需注册，没有使用限制。
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <h3
                className="font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                关于
              </h3>
              <a
                href="#"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                功能特点
              </a>
              <a
                href="#"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                常见问题
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © 2025 • Raphael AI 保留所有权利。
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              隐私政策
            </a>
            <a
              href="#"
              className="text-sm hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
