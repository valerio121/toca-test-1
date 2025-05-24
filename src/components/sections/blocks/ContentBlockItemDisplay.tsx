import SanityImageBlock from '@/components/utility/SanityImageBlock';
import { cn, extractUrl } from '@/libs/functions';
import type { ContentBlockItem as ContentBlockItemType } from '@/sanity/types';
import Link from 'next/link';

// For conditional classes

interface ContentBlockItemProps {
  block: ContentBlockItemType;
  className?: string; // Allow passing custom classes for different contexts
}

export default function ContentBlockItemDisplay({ block, className }: ContentBlockItemProps) {
  const { eyebrow, title, backgroundImage, cta } = block;

  return (
    <div
      className={cn(
        'group relative flex min-h-[600px] flex-col items-center justify-end overflow-hidden p-8 text-center text-white md:min-h-[700px] lg:min-h-[750px]',
        className // Allow parent to pass additional classes
      )}
    >
      {backgroundImage?.asset && (
        <SanityImageBlock
          image={backgroundImage}
          fill
          className='absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
          priority // Consider adding if these are LCP elements
        />
      )}
      {/* Dark gradient overlay from bottom */}
      <div className='absolute inset-x-0 bottom-0 z-10 h-3/4 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />

      <div className='relative z-20 flex w-full max-w-md flex-col items-center'>
        {eyebrow && (
          <p className='mb-2 text-xs font-semibold tracking-widest text-amber-400 uppercase md:text-sm'>{eyebrow}</p>
        )}
        {title && (
          <h3 className='mb-5 font-serif text-3xl leading-tight text-white md:text-4xl lg:text-[2.5rem] lg:leading-tight'>
            {title}
          </h3>
        )}
        {cta && (cta.internal?.slug?.current || cta.external) && (
          <Link
            href={extractUrl(cta)}
            target={cta.isNewWindow ? '_blank' : '_self'}
            className='mt-3 rounded-full border border-white bg-transparent px-8 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
          >
            {cta.title || 'Learn More'}
          </Link>
        )}
      </div>
    </div>
  );
}
