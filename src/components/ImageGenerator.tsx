import React, { useState, useRef, useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ImageGenerator = () => {
  const { theme } = useTheme();
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showNegativePrompt, setShowNegativePrompt] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  // 模拟生成图片
  // const handleGenerate = () => {
  //   const mockGeneratedImages = [
  //     'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=500&fit=crop',
  //     'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&h=500&fit=crop',
  //     'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop',
  //     'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=500&h=500&fit=crop',
  //   ];
  //   setGeneratedImages(mockGeneratedImages);
  // };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.us1.bfl.ai/v1/flux-pro-1.1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-key': '2fc3796f-ff94-407a-803b-8728f9690fc2',
        },
        body: JSON.stringify({
          prompt: prompt,
          width: 1024,
          height: 768,
          prompt_upsampling: false,
          safety_tolerance: 2,
          output_format: 'jpeg',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      const pollingUrl = data.polling_url;

      // Poll for results
      const pollResult = async () => {
        const resultResponse = await fetch(pollingUrl);
        const resultData = await resultResponse.json();

        if (resultData.result && resultData.result.sample) {
          // Update state with the generated image URL
          setGeneratedImages([resultData.result.sample]);
        } else {
          // If result is not ready, poll again after 1 second
          setTimeout(pollResult, 1000);
        }
      };

      // Start polling
      await pollResult();
    } catch (error) {
      console.error('Error generating images:', error);
      // Add proper error handling here
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDownload = (
  //   imageUrl: string,
  //   fileName: string = 'generated-image.jpg'
  // ) => {
  //   const link = document.createElement('a');
  //   link.href = imageUrl;
  //   link.download = fileName;
  //   link.target = '_blank'; // 添加 target 属性
  //   link.rel = 'noopener noreferrer'; // 添加安全属性
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleDownload = async (
    imageUrl: string,
    fileName: string = 'generated-image.jpg'
  ) => {
    try {
      const response = await fetch(imageUrl, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // 如果直接下载失败，回退到在新窗口打开
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div className="flex justify-between items-start mb-6">
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            AI 图像生成器
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              通过描述词
            </label>
            {/* Text Input Area */}
            <div className="mb-4">
              <textarea
                className="w-full min-h-[120px] rounded-lg p-4 outline-none resize-none transition-all"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
                placeholder="你想看到什么？"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* Image Upload Area */}
            <div
              className="relative w-full min-h-[80px] rounded-lg p-3 transition-all hover:border-accent-500"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--accent-primary)',
                border: '2px dashed var(--border-color)',
              }}
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
                      className="absolute top-1 right-1 p-1 rounded-full z-10"
                      style={{ backgroundColor: 'var(--bg-primary)' }}
                    >
                      <X size={14} style={{ color: 'var(--text-primary)' }} />
                    </button>
                    <img
                      src={uploadedImage}
                      alt="Reference"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p
                    style={{ color: 'var(--text-secondary)' }}
                    className="text-sm"
                  >
                    点击更换参考图片
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p
                    className="text-sm flex items-center gap-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
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
              <label
                className="block text-sm mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                场景内容（选用填写词）
              </label>
              <textarea
                className="w-full rounded-lg p-4 transition-all"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
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
                  className="px-3 py-1.5 rounded flex items-center gap-2 transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                  }}
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
                  <div
                    className="absolute top-full left-0 mt-1 w-48 rounded-lg shadow-lg z-50 animate-fadeIn"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div className="py-1 max-h-64 overflow-y-auto">
                      {styles.map((style, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors hover:bg-opacity-10"
                          style={{ color: 'var(--text-primary)' }}
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
              {['无风格', '无色彩', '无光照', '无构图'].map((label, index) => (
                <button
                  key={index}
                  className="px-3 py-1.5 rounded transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded transition-colors"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                }}
                onChange={(e) => setShowNegativePrompt(e.target.checked)}
                checked={showNegativePrompt}
              />
              <span style={{ color: 'var(--text-secondary)' }}>反向提示词</span>
            </label>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                清除
              </button>
              <button
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                随机
              </button>
              <button
                className={`px-6 py-2 rounded-lg ${
                  theme === 'dark' ? 'text-black' : 'text-white'
                } font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                style={{
                  background: '#FF6700',
                  border: '2px solid var(--orange-primary)',
                  boxShadow: '0 4px 12px -2px rgba(var(--orange-shadow), 0.5)',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                }}
                onClick={handleGenerate}
              >
                生成
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Images Section */}
      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div
              className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent"
              style={{ borderColor: 'var(--accent-primary)' }}
            ></div>
          </div>
        ) : (
          generatedImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {generatedImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden group relative"
                >
                  <img
                    src={image}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      预览
                    </button>
                    <button
                      onClick={() =>
                        handleDownload(
                          image,
                          `generated-image-${index + 1}.jpg`
                        )
                      }
                      className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-colors"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    >
                      下载
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute top-4 right-4 flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(selectedImage);
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              下载图片
            </button>
            <button
              onClick={() => setSelectedImage(null)}
              className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="h-full w-full flex items-center justify-center p-8">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-[90%] max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );

  // return (
  //   <section className="max-w-4xl mx-auto px-4 py-12">
  //     <div className="bg-[#2C2927] rounded-xl p-6">
  //       <div className="flex justify-between items-start mb-6">
  //         <h2 className="text-2xl font-bold">AI 图像生成器</h2>
  //       </div>
  //       <div className="space-y-4">
  //         <div>
  //           <label className="block text-sm text-gray-400 mb-2">
  //             通过描述词
  //           </label>
  //           {/* Text Input Area */}
  //           <div className="mb-4">
  //             {/* <textarea
  //               className="w-full min-h-[120px] bg-[#1C1917] border border-gray-700 rounded-lg p-4 text-white outline-none resize-none transition-all focus:border-amber-500"
  //               placeholder="你想看到什么？"
  //               rows={3}
  //             /> */}
  //             <textarea
  //               className="w-full min-h-[120px] bg-[#1C1917] border border-gray-700 rounded-lg p-4 text-white outline-none resize-none transition-all focus:border-amber-500"
  //               placeholder="你想看到什么？"
  //               rows={3}
  //               value={prompt}
  //               onChange={(e) => setPrompt(e.target.value)}
  //             />
  //           </div>

  //           {/* Image Upload Area */}
  //           <div
  //             className="relative w-full min-h-[80px] bg-[#1C1917] border-2 border-dashed border-gray-700 rounded-lg p-3 transition-all hover:border-amber-500"
  //             onDrop={onDrop}
  //             onDragOver={onDragOver}
  //             onClick={handleClick}
  //             role="button"
  //             tabIndex={0}
  //           >
  //             <input
  //               type="file"
  //               ref={fileInputRef}
  //               onChange={handleFileChange}
  //               accept="image/*"
  //               className="hidden"
  //             />

  //             {uploadedImage ? (
  //               <div className="flex items-center gap-4">
  //                 <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden">
  //                   <button
  //                     onClick={(e) => {
  //                       e.stopPropagation();
  //                       setUploadedImage(null);
  //                     }}
  //                     className="absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-black/70 z-10"
  //                   >
  //                     <X size={14} />
  //                   </button>
  //                   <img
  //                     src={uploadedImage}
  //                     alt="Reference"
  //                     className="w-full h-full object-cover"
  //                   />
  //                 </div>
  //                 <p className="text-sm text-gray-400">点击更换参考图片</p>
  //               </div>
  //             ) : (
  //               <div className="flex items-center justify-center h-full text-gray-500">
  //                 <p className="text-sm flex items-center gap-2">
  //                   <span>拖拽图片到这里或点击上传</span>
  //                   <svg
  //                     className="w-4 h-4"
  //                     fill="none"
  //                     stroke="currentColor"
  //                     viewBox="0 0 24 24"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth={2}
  //                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
  //                     />
  //                   </svg>
  //                 </p>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //         {showNegativePrompt && (
  //           <div className="animate-slideDown">
  //             <label className="block text-sm text-gray-400 mb-2">
  //               场景内容（选用填写词）
  //             </label>
  //             <textarea
  //               className="w-full bg-[#1C1917] border border-gray-700 rounded-lg p-4 text-white transition-all focus:border-amber-500"
  //               placeholder="你想选完什么？"
  //               rows={3}
  //             />
  //           </div>
  //         )}

  //         <div className="relative">
  //           <div className="flex flex-wrap gap-2">
  //             <div className="relative">
  //               <button
  //                 onClick={() => setShowStyleDropdown(!showStyleDropdown)}
  //                 className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm flex items-center gap-2 hover:bg-[#2C2927] transition-colors"
  //               >
  //                 正方形
  //                 <ChevronDown
  //                   size={16}
  //                   className={`transform transition-transform ${
  //                     showStyleDropdown ? 'rotate-180' : ''
  //                   }`}
  //                 />
  //               </button>
  //               {showStyleDropdown && (
  //                 <div className="absolute top-full left-0 mt-1 w-48 bg-[#2C2927] border border-gray-700 rounded-lg shadow-lg z-50 animate-fadeIn">
  //                   <div className="py-1 max-h-64 overflow-y-auto">
  //                     {styles.map((style, index) => (
  //                       <button
  //                         key={index}
  //                         className="w-full px-4 py-2 text-left text-sm hover:bg-[#3C3937] flex items-center gap-2 transition-colors"
  //                         onClick={() => setShowStyleDropdown(false)}
  //                       >
  //                         <span>{style.icon}</span>
  //                         <span>{style.label}</span>
  //                       </button>
  //                     ))}
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //             <button className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
  //               无风格
  //             </button>
  //             <button className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
  //               无色彩
  //             </button>
  //             <button className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
  //               无光照
  //             </button>
  //             <button className="px-3 py-1.5 rounded bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
  //               无构图
  //             </button>
  //           </div>
  //         </div>

  //         <div className="flex items-center justify-between">
  //           <label className="flex items-center gap-2">
  //             <input
  //               type="checkbox"
  //               className="rounded bg-gray-700 border-gray-600"
  //               onChange={(e) => setShowNegativePrompt(e.target.checked)}
  //               checked={showNegativePrompt}
  //             />
  //             <span className="text-sm text-gray-400">反向提示词</span>
  //           </label>
  //           <div className="flex gap-2">
  //             <button className="px-4 py-2 rounded-lg bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
  //               清除
  //             </button>
  //             <button className="px-4 py-2 rounded-lg bg-[#1C1917] border border-gray-700 text-sm hover:bg-[#2C2927] transition-colors">
  //               随机
  //             </button>
  //             <button
  //               className="bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-lg text-sm transition-colors"
  //               onClick={handleGenerate}
  //             >
  //               生成
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Generated Images Section */}
  //     <div className="mt-8">
  //       {isLoading ? (
  //         <div className="flex justify-center items-center h-64">
  //           <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent"></div>
  //         </div>
  //       ) : (
  //         generatedImages.length > 0 && (
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
  //             {generatedImages.map((image, index) => (
  //               <div
  //                 key={index}
  //                 className="aspect-square rounded-xl overflow-hidden group relative"
  //               >
  //                 <img
  //                   src={image}
  //                   alt={`Generated image ${index + 1}`}
  //                   className="w-full h-full object-cover"
  //                 />
  //                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
  //                   <button
  //                     onClick={() => setSelectedImage(image)}
  //                     className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
  //                   >
  //                     预览
  //                   </button>
  //                   <button
  //                     onClick={() =>
  //                       handleDownload(
  //                         image,
  //                         `generated-image-${index + 1}.jpg`
  //                       )
  //                     }
  //                     className="bg-amber-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
  //                   >
  //                     下载
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         )
  //       )}
  //     </div>

  //     {/* Preview Modal */}
  //     {selectedImage && (
  //       <div
  //         className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
  //         onClick={() => setSelectedImage(null)}
  //       >
  //         <div className="absolute top-4 right-4 flex gap-4">
  //           <button
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               handleDownload(selectedImage);
  //             }}
  //             className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
  //           >
  //             下载图片
  //           </button>
  //           <button
  //             onClick={() => setSelectedImage(null)}
  //             className="bg-white/10 text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
  //           >
  //             <X size={24} />
  //           </button>
  //         </div>
  //         <div className="h-full w-full flex items-center justify-center p-8">
  //           <img
  //             src={selectedImage}
  //             alt="Preview"
  //             className="max-w-[90%] max-h-[90vh] object-contain rounded-lg"
  //           />
  //         </div>
  //       </div>
  //     )}
  //   </section>
  // );
};

export default ImageGenerator;
