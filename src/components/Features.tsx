import React from 'react';
import { Star, Sparkles, Zap, Shield, Palette, DollarSign } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <DollarSign className="w-8 h-8 text-amber-500" />,
      title: "零成本创建",
      description: "世界上第一个完全免费的 AI 图像生成器，没有使用限制或注册要求。"
    },
    {
      icon: <Star className="w-8 h-8 text-amber-500" />,
      title: "最先进的质量",
      description: "由 FLUX-1-Dev 模型提供支持，提供具有卓越细节和艺术风格控制的高质图像。"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      title: "高级文本理解",
      description: "卓越的文本到图像功能，可准确解释复杂提示词和文本覆盖功能。"
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: "闪电般快速的生成",
      description: "优化的推理管道确保快速生成图像，且不影响质量。"
    },
    {
      icon: <Shield className="w-8 h-8 text-amber-500" />,
      title: "增强的隐私保护",
      description: "零数据保留政策 - 您的提示词和生成的图像永不在服务器存储。"
    },
    {
      icon: <Palette className="w-8 h-8 text-amber-500" />,
      title: "多样风格支持",
      description: "创建各种艺术风格的图像，从照片级写实到动漫、油画到数字艺术。"
    }
  ];

return (
  <section id="features" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-20">
    <h2
      className="text-3xl font-bold text-center mb-4"
      style={{ color: 'var(--text-primary)' }}
    >
      Raphael AI 的主要功能
    </h2>
    <p className="text-center mb-12" style={{ color: 'var(--text-secondary)' }}>
      体验下一代 AI 图像生成 - 强大、免费且注重隐私。
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="p-6 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="mb-4">{feature.icon}</div>
          <h3
            className="text-xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {feature.title}
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);
};

export default Features;