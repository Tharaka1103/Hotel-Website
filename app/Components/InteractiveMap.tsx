"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const InteractiveMap: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const container = containerRef.current;
    
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const maxX = (containerRect.width * (scale - 1)) / 2;
      const maxY = (containerRect.height * (scale - 1)) / 2;
      
      let newX = touch.clientX - dragStart.x;
      let newY = touch.clientY - dragStart.y;
      
      // Constrain movement within bounds
      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    
    const container = containerRef.current;
    
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const maxX = (containerRect.width * (scale - 1)) / 2;
      const maxY = (containerRect.height * (scale - 1)) / 2;
      
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;
      
      // Constrain movement within bounds
      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(1.5);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        const container = containerRef.current;
        
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const maxX = (containerRect.width * (scale - 1)) / 2;
          const maxY = (containerRect.height * (scale - 1)) / 2;
          
          let newX = e.clientX - dragStart.x;
          let newY = e.clientY - dragStart.y;
          
          newX = Math.max(-maxX, Math.min(maxX, newX));
          newY = Math.max(-maxY, Math.min(maxY, newY));
          
          setPosition({ x: newX, y: newY });
        }
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, scale]);

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-gray-200 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        style={{ touchAction: 'none' }}
      >
        <motion.div
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
          animate={{
            x: position.x,
            y: position.y,
            scale: scale
          }}
          transition={{
            type: isDragging ? "tween" : "spring",
            duration: isDragging ? 0 : 0.3,
            ease: "easeOut"
          }}
        >
          <Image
            src="/images/map.png"
            alt="Interactive Location Map"
            fill
            className="object-cover pointer-events-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            quality={90}
            priority
          />
        </motion.div>
        
        {/* Overlay Instructions - Only show when not zoomed */}
        {scale === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 z-10"
          >
            <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
              <p className="font-medium">📍 Interactive Map</p>
              <p className="text-xs opacity-90">Drag to explore • Double tap to zoom</p>
            </div>
          </motion.div>
        )}
        
        {/* Control Buttons */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <motion.button
            onClick={() => setScale(Math.min(scale + 0.25, 2))}
            className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors"
            disabled={scale >= 2}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={() => setScale(Math.max(scale - 0.25, 1))}
            className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors"
            disabled={scale <= 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={resetPosition}
            className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
        </div>
        
        {/* Zoom Level Indicator */}
        {scale > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 z-10"
          >
            <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {Math.round(scale * 100)}%
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Map Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          🏖️ Rupa's Surf Resort - Arugam Bay, Sri Lanka
        </p>
      </div>
    </div>
  );
};

export default InteractiveMap;
