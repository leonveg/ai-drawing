import React from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn">
      <div 
        className="bg-[#2C2927] rounded-lg p-8 max-w-md w-full mx-4 relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">登录到 Raphael AI</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">邮箱</label>
            <input
              type="email"
              className="w-full bg-[#1C1917] border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 transition-colors"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">密码</label>
            <input
              type="password"
              className="w-full bg-[#1C1917] border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg transition-colors"
          >
            登录
          </button>
          
          <p className="text-center text-sm text-gray-400">
            还没有账号？
            <button className="text-amber-500 hover:text-amber-400 ml-1 transition-colors">
              注册
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;