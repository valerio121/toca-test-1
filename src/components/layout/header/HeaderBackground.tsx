'use client';

import GradientOverlay from '@/components/ui/GradientOverlay';
import { useVerticalScroll } from '@/hooks';
import { cn } from '@/libs/functions';

export default function HeaderBackground() {
  const scrollY = useVerticalScroll();

  return (
    <div className='absolute inset-0 z-10'>
      <GradientOverlay
        direction='to-b'
        className={cn(
          'absolute inset-0 z-10 from-black to-transparent transition-all duration-300',
          scrollY > 0 ? 'opacity-100' : 'opacity-80'
        )}
      />
    </div>
  );
}
