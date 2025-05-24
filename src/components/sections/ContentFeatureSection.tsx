import Container from '@/components/layout/Container';
import SanityImageBlock from '@/components/utility/SanityImageBlock';
import { cn, extractUrl } from '@/libs/functions';
import type { ContentFeatureSection } from '@/sanity/types';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

// For conditional classes

interface ContentFeatureSectionProps {
  section: ContentFeatureSection;
}

export default function ContentFeatureSectionComponent({ section }: ContentFeatureSectionProps) {
  const { eyebrow, title, description, image, imagePosition, cta } = section;
  // console.log('section : ', section); // Keep for debugging if needed

  console.log('section : ', section);
  const textContent = (
    <div
      className={cn(
        imagePosition === 'background'
          ? 'absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center text-white'
          : 'flex flex-col justify-center py-8 md:py-12' // Classes for non-background image positions
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'mb-2 text-[10px] font-semibold tracking-[0.2em] uppercase md:mb-3 md:text-xs',
            imagePosition === 'background' ? 'text-amber-400' : 'text-primary'
          )}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={cn(
            'mx-auto mb-6 max-w-2xl font-serif text-3xl leading-snug',
            imagePosition === 'background' ? 'text-white' : 'text-gray-900',
            'md:text-4xl lg:text-5xl' // General responsive sizes
          )}
        >
          {title}
        </h2>
      )}
      {/* Description is not shown in the target screenshot for this specific layout variation */}
      {/* {description && imagePosition === 'background' && (
        <div
          className={cn(
            'prose prose-sm md:prose-base lg:prose-lg max-w-xl text-center text-gray-200',
            imagePosition === 'background' ? 'prose-invert' : ''
          )}
        >
          <PortableText value={description} />
        </div>
      )} */}
      {description && imagePosition !== 'background' && (
        <div className={cn('prose lg:prose-lg max-w-none')}>
          <PortableText value={description} />
        </div>
      )}

      {cta && (cta.internal?.slug?.current || cta.external) && (
        <Link
          href={extractUrl(cta)}
          target={cta.isNewWindow ? '_blank' : '_self'}
          className={cn(
            'mt-6 inline-block rounded-md px-6 py-2 text-xs font-medium tracking-wider uppercase transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:px-8 md:py-2.5 md:text-sm',
            imagePosition === 'background'
              ? 'border border-white text-white hover:bg-white/10 focus-visible:outline-white'
              : 'bg-primary hover:bg-primary/80 focus-visible:outline-primary text-white'
          )}
        >
          {cta.title || 'Learn More'}
        </Link>
      )}
    </div>
  );

  const imageRender = image?.asset && (
    <SanityImageBlock
      image={image}
      className={cn(imagePosition === 'background' ? 'h-full w-full object-cover' : 'rounded-lg shadow-lg')}
      fill={imagePosition === 'background'}
      priority={imagePosition === 'background'}
    />
  );

  if (imagePosition === 'background') {
    return (
      <section className='w-full bg-black py-12 md:py-12'>
        <Container>
          <div className='relative min-h-[70vh] w-full overflow-hidden rounded-lg shadow-xl md:min-h-[80vh] lg:min-h-[650px]'>
            {imageRender}
            <div className='absolute inset-0 z-10 rounded-lg bg-black/75' />
            {textContent}
          </div>
        </Container>
      </section>
    );
  }

  // Fallback for imagePosition 'left' or 'right' (current structure)
  return (
    <Container className='py-12 md:py-16'>
      <div
        className={cn(
          'grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16',
          imagePosition === 'right' && 'md:[&>*:first-child]:col-start-2'
        )}
      >
        {imagePosition === 'left' ? (
          <>
            {imageRender}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageRender}
          </>
        )}
      </div>
    </Container>
  );
}
