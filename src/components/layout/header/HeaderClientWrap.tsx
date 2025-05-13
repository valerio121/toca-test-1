'use client';

import { cn } from '@/libs/functions';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export default function HeaderClientWrap({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    startTransition(() => {
      setIsOpen(false);
    });
  }, [pathname]);

  const handleToggleMenu = () => {
    startTransition(() => {
      setIsOpen(!isOpen);
    });
  };

  return (
    <div>
      <button
        className='relative z-30 flex h-4 w-4 cursor-pointer flex-col justify-center md:h-[3.15rem] md:w-[3.15rem]'
        onClick={handleToggleMenu}
        aria-expanded={isOpen}
        aria-label='Toggle menu'
      >
        <div
          className={cn(
            'absolute h-px w-4 bg-white transition-transform duration-500 md:w-[3.15rem]',
            isOpen ? 'translate-y-0 rotate-45' : '-translate-y-[5px] md:-translate-y-[7px]'
          )}
        />
        <div
          className={cn(
            'absolute h-px w-4 bg-white transition-opacity duration-500 md:w-[3.15rem]',
            isOpen ? 'opacity-0' : 'opacity-100'
          )}
        />
        <div
          className={cn(
            'absolute h-px w-4 bg-white transition-transform duration-500 md:w-[3.15rem]',
            isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[5px] md:translate-y-[7px]'
          )}
        />
      </button>

      <div
        className={cn(
          'absolute inset-x-0 top-0 h-screen w-screen transition-opacity duration-500',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}
