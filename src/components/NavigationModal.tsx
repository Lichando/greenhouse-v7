'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  items: { href: string; label: string }[];
}

export function NavigationModal({ isOpen, onClose, currentPath, items }: NavigationModalProps) {
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = items.findIndex((item) => item.href === currentPath);
    return index >= 0 ? index : 0;
  });
  const [isDesktop, setIsDesktop] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    const item = items[index];
    if (item) router.push(item.href);
    setTimeout(() => onClose(), 300);
  };

  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  const getPosition = (index: number) => {
    const distance = index - activeIndex;
    const horizontalOffset = isDesktop ? distance * 380 : distance * 200;
    const verticalOffset = Math.abs(distance) * (isDesktop ? 60 : 30);
    return { horizontalOffset, verticalOffset };
  };

  const getRotation = (index: number) => {
    const distance = index - activeIndex;
    return isDesktop ? distance * -35 : distance * -25;
  };

  const getScale = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    return isDesktop ? 0.75 : 0.8;
  };

  const getOpacity = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    return 0.7;
  };

  const getZIndex = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 10;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none ${
          isOpen ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      >
        <div
          className={`pointer-events-auto w-full max-w-2xl mx-auto px-4 py-8 md:py-16 transition-all duration-300 ${
            isOpen ? 'scale-100' : 'scale-95'
          }`}
          style={{
            perspective: isDesktop ? '2000px' : '1200px',
          }}
        >
          {/* Carousel container */}
          <div className={`relative w-full ${isDesktop ? 'h-96' : 'h-72'} flex items-center justify-center`}>
            {items.map((item, index) => {
              const { horizontalOffset, verticalOffset } = getPosition(index);
              const rotation = getRotation(index);
              const scale = getScale(index);
              const opacity = getOpacity(index);
              const zIndex = getZIndex(index);

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className="absolute transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `
                      translateX(${horizontalOffset}px)
                      translateY(${verticalOffset}px)
                      rotateY(${rotation}deg)
                      rotateZ(${Math.abs(rotation) * 0.3}deg)
                      scale(${scale})
                    `,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                >
                  {/* Card with 3D effect */}
                  <div
                    className={`
                      rounded-3xl font-montserrat font-bold transition-all duration-300
                      backdrop-blur-md border transition-colors
                      ${isDesktop ? 'px-10 py-8 text-3xl' : 'px-6 py-4 text-xl'}
                      ${
                        activeIndex === index
                          ? 'bg-white text-primary shadow-2xl shadow-primary/50 border-primary/50'
                          : 'bg-white/15 text-white border-white/30 shadow-xl hover:bg-white/25 hover:border-white/40'
                      }
                    `}
                  >
                    {item.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicator */}
            <div className="text-white/60 font-montserrat text-sm">
              {activeIndex + 1} / {items.length}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
