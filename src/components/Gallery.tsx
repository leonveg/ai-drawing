import React from 'react';

const Gallery = () => {
  const images = [
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=500&h=500&fit=crop',
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">寻找灵感</h2>
      <p className="text-center text-gray-400 mb-12">发现其他用户使用 Raphael 创作的精彩作品</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="aspect-square rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;