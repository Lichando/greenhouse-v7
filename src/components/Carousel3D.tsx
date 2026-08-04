'use client';

import { useState } from 'react';
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
  const router = useRouter();

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    onSelect?.(index);
    router.push(items[index].href);
  };

  const getRotation = (index: number) => {
    const distance = index - activeIndex;
    return distance * 40;
  };

  const getScale = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.75;
    return 0.5;
  };

  const getOpacity = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.6;
    return 0.3;
  };

  const getZIndex = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    return 100 - distance;
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto h-40 flex items-center justify-center"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Carousel container */}
      <div className="relative w-full h-full">
        {items.map((item, index) => {
          const rotation = getRotation(index);
          const scale = getScale(index);
          const opacity = getOpacity(index);
          const zIndex = getZIndex(index);

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `
                  translateX(calc(-50% + ${Math.sin((rotation * Math.PI) / 180) * 180}px))
                  rotateY(${rotation}deg)
                  translateZ(${Math.cos((rotation * Math.PI) / 180) * 200}px)
                  scale(${scale})
                `,
                opacity: opacity,
                zIndex: zIndex,
              }}
            >
              {/* Card */}
              <div
                className={`
                  px-8 py-4 rounded-2xl font-montserrat font-bold text-lg transition-all duration-300
                  ${
                    activeIndex === index
                      ? 'bg-white text-primary shadow-2xl shadow-primary/40'
                      : 'bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-lg'
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`h-2 rounded-full transition-all ${
              activeIndex === index
                ? 'bg-white w-6'
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
