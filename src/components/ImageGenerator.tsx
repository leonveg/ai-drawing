import React, { useState, useRef, useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';

const ImageGenerator = () => {
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showNegativePrompt, setShowNegativePrompt] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const styles = [
    { icon: '⬜', label: 'None' },
    { icon: '🎨', label: 'Digital Art' },
    { icon: '🌟', label: 'Neon Punk' },
    { icon: '✏️', label: 'Line Art' },
    { icon: '🖼️', label: 'Pixel Art' },
    { icon: '📸', label: 'Photographic' },
    { icon: '🎞️', label: 'Analog Film' },
    { icon: '📄', label: 'Origami' },
    { icon: '🎮', label: '3D Model' },
    { icon: '🎭', label: 'Anime' },
    { icon: '🔮', label: 'Fantasy Art' },
    { icon: '📐', label: 'Low Poly' },
    { icon: '🎬', label: 'Cinematic' },
    { icon: '✨', label: 'Enhance' },
    { icon: '📚', label: 'Comic Book' },
    { icon: '📏', label: 'Isometric' },
    { icon: '🏺', label: 'Craft Clay' },
  ];

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleGenerate = () => {
    // 模拟生成图片
    const mockGeneratedImages = [
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=500&h=500&fit=crop',
    ];
    setGeneratedImages(mockGeneratedImages);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-[#2C2927] rounded-xl p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">AI 图像生成器</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              通过描述词
            </label>
            {/* Text Input Area */}
            <div className="mb-4">
              <textarea
                className="w-full min-h-[120px] bg-[#1C1917] border border-gray-700 rounded-lg p-4 text-white outline-none resize-none transition-all focus:border-amber-500"
                placeholder="你想看到什么？"
                rows={3}
              />
            </div>

            {/* Image Upload Area */}
            <div
              className="relative w-full min-h-[80px] bg-[#1C1917] border-2 border-dashed border-gray-700 rounded-lg p-3 transition-all hover:border-amber-500"
              onDrop={onDrop}
              onDragOver={onDragOver}
              onClick={handleClick}
              role="button"
              tabIndex={0}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {uploadedImage ? (
                <div className="flex items-center gap-4">
                  <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedImage(null);
                      }}
                      className="absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-black/70 z-10"
                    >
                      <X size={14} />
                    </button>
                    <img
                      src={uploadedImage}
                      alt="Reference"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-400">点击更换参考图片</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p className="text-sm flex items-center gap-2">
                    <span>拖拽图片到这里或点击上传</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </p>
                </div>
              )}
            </div>
          </div>
          {showNegativePrompt && (
            <div className="animate-slideDown">
              <label className="block text-sm text-gray-400 mb-2">
                场景内容（选用填写词）
              </label>
              <textarea
                className="w-full bg-[#1C1917] border border-gray-700 rounded-lg p-4 text-white transition-all focus:border-amber-500"
                placeholder="你想选完什么？"
                rows={3}
              />
            </div>
          )}

          <div className="relative">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowStyleDropdown(!showStyleDropdown)}
                  className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm flex items-center gap-2 hover:bg-[#2C2927] transition-colors"
                >
                  正方形
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      showStyleDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {showStyleDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-[#2C2927] border border-gray-700 rounded-lg shadow-lg z-50 animate-fadeIn">
                    <div className="py-1 max-h-64 overflow-y-auto">
                      {styles.map((style, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[#3C3937] flex items-center gap-2 transition-colors"
                          onClick={() => setShowStyleDropdown(false)}
                        >
                          <span>{style.icon}</span>
                          <span>{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
                无风格
              </button>
              <button className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
                无色彩
              </button>
              <button className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
                无光照
              </button>
              <button className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
                无构图
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded bg-gray-700 border-gray-600"
                onChange={(e) => setShowNegativePrompt(e.target.checked)}
                checked={showNegativePrompt}
              />
              <span className="text-sm text-gray-400">反向提示词</span>
            </label>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
                清除
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
                随机
              </button>
              <button
                className="bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-lg text-sm transition-colors"
                onClick={handleGenerate}
              >
                生成
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Images */}
      {generatedImages.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
          {generatedImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden transform hover:scale-105 transition-transform"
            >
              <img
                src={image}
                alt={`Generated image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ImageGenerator;
