import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: 'David Thompson',
    role: '游戏开发者',
    text: '作为游戏开发者，Raphael AI 的 AI 图像生成器对我来说非常宝贵。资源生成的速度和质量都非常出色，而且免费意味着我可以将预算集中在其他重要的开发环节。',
    rating: 5,
  },
  {
    name: 'Emily Parker',
    role: 'YouTube 上的内容创作者',
    text: '我每天使用 Raphael AI 的 AI 图像生成创建缩略图。文本理解能力令人难以置信 - 它准确地捕捉了我需要的内容，而且无需注册的政策使其超级方便。',
    rating: 5,
  },
  {
    name: 'Robert Wilson',
    role: 'TechFlow 的 UI/UX 设计师',
    text: 'Raphael AI 的 AI 图像生成器中的 FLUX-1-Dev 模型产生了我所见过的最一致和高质量的结果。它已成为我们生成模型图像的首选工具。',
    rating: 4,
  },
  {
    name: 'Sophia Lee',
    role: '数字营销专家',
    text: '我喜欢 Raphael AI 的 AI 图像生成器的简单性和易用性。我可以在几秒钟内生成图像，而不会损失质量。这是我找到的最好的免费 AI 图像生成器之一。',
    rating: 5,
  },
  {
    name: 'John Doe',
    role: '创业者',
    text: 'Raphael AI 的 AI 图像生成器是我最喜欢的工具之一。我可以在几秒钟内生成图像，而不会损失质量。这是我找到的最好的免费 AI 图像生成器之一。',
    rating: 5,
  },
  {
    name: 'Jane Doe',
    role: '设计师',
    text: 'Raphael AI 的 AI 图像生成器是我最喜欢的工具之一。我可以在几秒钟内生成图像，而不会损失质量。这是我找到的最好的免费 AI 图像生成器之一。',
    rating: 5,
  },
  {
    name: 'Jenny Doe',
    role: '设计师',
    text: 'Raphael AI 的 AI 图像生成器是我最喜欢的工具之一。我可以在几秒钟内生成图像，而不会损失质量。这是我找到的最好的免费 AI 图像生成器之一。',
    rating: 5,
  },
  {
    name: 'James Doe',
    role: '设计师',
    text: 'Raphael AI 的 AI 图像生成器是我最喜欢的工具之一。我可以在几秒钟内生成图像，而不会损失质量。这是我找到的最好的免费 AI 图像生成器之一。',
    rating: 5,
  },
  {
    name: 'Jessica Doe',
    role: '设计师',
    text: 'Raphael AI 的 AI 图像生成器是我最喜欢的工具之一。我可以在几秒钟内生成图像，而不会损失质量。这是我找到的最好的免费 AI 图像生成器之一。',
    rating: 5,
  },
  {
    name: 'Jack Doe',
    role: '设计师',
    text: 'Raphael AI 的 AI 图像生成器是我最喜欢的工具之一。我可以在几秒钟内生成图像，而不会损失质量。这是我找到的最好的免费 AI 图像生成器之一。',
    rating: 5,
  },
  {
    name: 'Jill Doe',
    role: '设计师',
    text: 'Raphael AI 的 AI 图像生成器是我最喜欢的工具之一。我可以在几秒钟内生成图像，而不会损失质量。这是我找到的最好的免费 AI 图像生成器之一。',
    rating: 5,
  },
  {
    name: 'Jenny Doe',
    role: '设计师',
    text: 'Raphael AI 的 AI 图像生成器是我最喜欢的工具之一。我可以在几秒钟内生成图像，而不会损失质量。这是我找到的最好的免费 AI 图像生成器之一。',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          用户对 Raphael AI 的评价
        </h2>

        {/* 添加渐变遮罩 */}
        <div className="absolute left-0 top-[80px] w-[20%] h-[calc(100%-80px)] bg-gradient-to-r from-[#1C1917] to-transparent z-10"></div>
        <div className="absolute right-0 top-[80px] w-[20%] h-[calc(100%-80px)] bg-gradient-to-l from-[#1C1917] to-transparent z-10"></div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          speed={8000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className="!overflow-visible testimonials-swiper"
          allowTouchMove={false}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <SwiperSlide key={index} className="!w-[400px]">
              <div className="bg-[#2C2927] p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                <p className="text-lg text-gray-300 mb-4 line-clamp-4">
                  {testimonial.text}
                </p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="text-xl font-bold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.396 2.47a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.396-2.47a1 1 0 00-1.176 0l-3.396 2.47c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.34 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
