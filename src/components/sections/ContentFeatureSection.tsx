import Container from '@/components/layout/Container';
import SanityImageBlock from '@/components/utility/SanityImageBlock';
import { cn, extractUrl } from '@/libs/functions';
import type { ContentFeatureSection } from '@/sanity/types';
import Link from 'next/link';

// For conditional classes

interface ContentFeatureSectionProps {
  section: ContentFeatureSection;
}

export default function ContentFeatureSectionComponent({ section }: ContentFeatureSectionProps) {
  const { eyebrow, title, image, imagePosition, cta } = section;
  // console.log('section : ', section); // Keep for debugging if needed

  const textContent = (
    <div
      className={cn(
        'flex flex-col justify-center',
        imagePosition === 'background'
          ? 'relative z-10 h-full items-center p-8 text-center text-white'
          : 'py-8 md:py-12' // Classes for non-background image positions
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'mb-2 text-xs font-semibold tracking-widest uppercase md:mb-3 md:text-sm',
            imagePosition === 'background' ? 'text-amber-400' : 'text-primary' // Using amber for gold/beige, adjust as needed
          )}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={cn(
            'mb-4 font-serif text-3xl md:text-4xl lg:text-5xl', // Using font-serif, adjust weight as needed
            imagePosition === 'background' ? 'text-white' : 'text-gray-900'
          )}
        >
          {title}
        </h2>
      )}

      {cta && (cta.internal?.slug?.current || cta.external) && (
        <Link
          href={extractUrl(cta)}
          target={cta.isNewWindow ? '_blank' : '_self'}
          className={cn(
            'mt-6 inline-block rounded-full px-8 py-2.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
            imagePosition === 'background'
              ? 'border border-white text-white hover:bg-white/10 focus-visible:outline-white'
              : 'bg-primary hover:bg-primary/80 focus-visible:outline-primary text-white' // Style for non-background CTA
          )}
        >
          {cta.title || 'Learn More'}
        </Link>
      )}
    </div>
  );

  const imageContent = image?.asset && (
    <div
      className={cn(
        imagePosition === 'background'
          ? 'absolute inset-4 z-0 overflow-hidden rounded-md md:inset-6 lg:inset-8' // Added inset for margin & rounded
          : 'flex items-center justify-center p-4 md:p-8' // Original classes for other positions
      )}
    >
      <SanityImageBlock
        image={image}
        className={cn(
          'h-full w-full object-cover',
          imagePosition !== 'background' && 'rounded-lg shadow-lg' // Keep rounded for non-bg
        )}
        fill // Fill prop will make it cover the parent div defined above
        priority={imagePosition === 'background'}
      />
    </div>
  );

  if (imagePosition === 'background') {
    return (
      <section className='relative flex min-h-[700px] w-full items-center justify-center bg-black py-16 md:min-h-[800px] md:py-24 lg:min-h-[900px]'>
        {imageContent}
        <div className='absolute inset-4 z-[5] rounded-md bg-black/70 md:inset-6 lg:inset-8' />
        <Container className='relative z-10 w-full'>{textContent}</Container>
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
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </Container>
  );
}
