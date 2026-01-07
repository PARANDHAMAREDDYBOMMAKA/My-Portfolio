"use client";

import { useState, useEffect } from 'react';

interface ViewportInfo {
  width: number;
  height: number;
  vw: (value: number) => number;
  vh: (value: number) => number;
  vmin: (value: number) => number;
  vmax: (value: number) => number;
  aspectRatio: number;
  isPortrait: boolean;
  isLandscape: boolean;
}

export const useViewport = (): ViewportInfo => {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    vw: (value: number) => (typeof window !== 'undefined' ? (window.innerWidth * value) / 100 : value),
    vh: (value: number) => (typeof window !== 'undefined' ? (window.innerHeight * value) / 100 : value),
    vmin: (value: number) => (typeof window !== 'undefined' ? (Math.min(window.innerWidth, window.innerHeight) * value) / 100 : value),
    vmax: (value: number) => (typeof window !== 'undefined' ? (Math.max(window.innerWidth, window.innerHeight) * value) / 100 : value),
    aspectRatio: typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 16 / 9,
    isPortrait: typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : false,
    isLandscape: typeof window !== 'undefined' ? window.innerWidth >= window.innerHeight : true,
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;

      setViewport({
        width,
        height,
        vw: (value: number) => (width * value) / 100,
        vh: (value: number) => (height * value) / 100,
        vmin: (value: number) => (Math.min(width, height) * value) / 100,
        vmax: (value: number) => (Math.max(width, height) * value) / 100,
        aspectRatio,
        isPortrait: height > width,
        isLandscape: width >= height,
      });
    };

    updateViewport();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewport, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return viewport;
};
