import React from 'react';

const Stats = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">受到数百万人的信任</h2>
      <p className="text-gray-400 mb-12">加入世界上最大的免费 AI 图像生成器社区</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-5xl font-bold text-amber-500">3M+</div>
          <p className="text-gray-400 mt-2">每月活跃用户</p>
        </div>
        <div>
          <div className="text-5xl font-bold text-amber-500">1,530</div>
          <p className="text-gray-400 mt-2">每分钟生成的图像</p>
        </div>
        <div>
          <div className="text-5xl font-bold text-amber-500">4.9</div>
          <p className="text-gray-400 mt-2">平均图像质量得分</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;