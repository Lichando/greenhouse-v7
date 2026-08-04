'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Item {
  href: string;
  label: string;
}

interface Carousel3DProps {
  items: Item[];
  onSelect?: (index: number) => void;
}

export function Carousel3D({ items, onSelect }: Carousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    onSelect?.(index);
    router.push(items[index].href);
  };

  const getPosition = (index: number) => {
    const distance = index - activeIndex;
    // Responsive positioning
    const horizontalOffset = isDesktop ? distance * 380 : distance * 200;
    const verticalOffset = Math.abs(distance) * (isDesktop ? 60 : 30);
    return { horizontalOffset, verticalOffset };
  };

  const getRotation = (index: number) => {
    const distance = index - activeIndex;
    // Responsive rotation
    return isDesktop ? distance * -35 : distance * -25;
  };

  const getScale = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    // Responsive scale
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
    <div 
      className="relative w-full mx-auto py-8 md:py-16 flex items-center justify-center"
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

      {/* Navigation dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 mt-12">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'bg-white w-8 h-3'
                : 'bg-white/40 w-3 h-3 hover:bg-white/60'
            }`}
            aria-label={`Go to ${items[index].label}`}
          />
        ))}
      </div>
    </div>
  );
}
