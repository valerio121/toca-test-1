'use client';

import fitty, { type FittyOptions } from 'fitty';
import { useEffect, useState, type RefObject } from 'react';

export function useFitty(ref: RefObject<HTMLElement | null>, options: FittyOptions = {}) {
  useEffect(() => {
    if (!ref.current) return;

    const instance = fitty(ref.current, options);

    return () => {
      instance.unsubscribe();
    };
  }, [ref, options]);
}

export function useVerticalScroll(): number {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY;
}
