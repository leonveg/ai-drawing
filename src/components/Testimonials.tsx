import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "David Thompson",
      role: "独立游戏开发者",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      content: "作为一名独立游戏开发者，Raphael AI 的 AI 图像生成器非常重要。质量生成的高质图像显得无可挑剔，而且免费基础版就可以快速将想法集中在其他地方。"
    },
    {
      name: "Emily Parker",
      role: "YouTube 上的内容创作者",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      content: "我每天使用 Raphael AI 的 AI 图像生成器创建缩略图，文本理解能力令人惊叹 - 它准确地捕捉了我想要的内容，而且无需注册就可以使用真超级方便。"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-4">用户对 Raphael AI 的评价</h2>
      <p className="text-center text-gray-400 mb-12">听取每天使用我们 AI 图像生成器的创作者和专业人士的意见。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 rounded-lg bg-[#2C2927]">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-300">{testimonial.content}</p>
            <div className="flex gap-1 mt-4">
              {[1,2,3,4,5].map((star) => (
                <svg key={star} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;