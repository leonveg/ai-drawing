import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "什么是 Raphael AI 以及它是如何工作的？",
      answer: "Raphael AI 是世界上第一个完全免费、无限的 AI 图像生成器，由 FLUX-1-Dev 模型提供支持。它允许你从文本描述创建高质量图像，而无需任何注册或使用限制。"
    },
    {
      question: "Raphael AI 真的可以免费使用吗？",
      answer: "是的，Raphael AI 完全免费使用！我们努力于打造世界上最大的、最强大的免费 AI 图像生成器，没有隐藏费用，无需信用卡，也没有使用限制。"
    },
    {
      question: "什么让 Raphael AI 与其他 AI 图像生成器不同？",
      answer: "Raphael AI 是唯一一个提供对先进的 FLUX-1-Dev 模型完全免费访问的平台。我们提供最先进的图像质量、快速的生成速度和完整的隐私保护，全部免费且无注册限。"
    },
    {
      question: "使用 Raphael AI 需要创建账号吗？",
      answer: "不需要创建账号或注册，只需访问 raphael.app 就能立即开始生成图像。我们相信让 AI 技术无障碍地服务每个人。"
    }
  ];

return (
  <section className="max-w-4xl mx-auto px-4 py-16">
    <h2
      className="text-3xl font-bold text-center mb-4"
      style={{ color: 'var(--text-primary)' }}
    >
      常见问题解答
    </h2>
    <p className="text-center mb-12" style={{ color: 'var(--text-secondary)' }}>
      还有其他问题？请发邮件至 support@raphael.app
    </p>

    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="p-6 rounded-lg border transition-colors"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--accent-text)' }}
            >
              {index + 1}
            </span>
            <span style={{ color: 'var(--text-primary)' }}>{faq.question}</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>{faq.answer}</p>
        </div>
      ))}
    </div>
  </section>
);
};

export default FAQ;