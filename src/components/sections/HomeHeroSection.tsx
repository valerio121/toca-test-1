import Container from '@/components/layout/Container';
import SanityImageBlock from '@/components/utility/SanityImageBlock';
import type { HomeHeroSection } from '@/sanity/types';

// Define a reusable component for the decorative line
const DecorativeLine = () => (
  <div className='diamond-line relative my-2 h-[0.5px] w-40 bg-white/40 md:my-3 lg:my-4'>
    {/* Diamonds via CSS pseudo-elements */}
  </div>
);

interface HomeHeroSectionProps {
  section: HomeHeroSection;
}

export default function HomeHeroSectionComponent({ section }: HomeHeroSectionProps) {
  const { backgroundImage, headlinePart1, headlinePart2, headlinePart3 } = section;

  // Common classes based on the provided CSS specs
  // font-family: Cormorant Garamond; -> handled by font-serif in tailwind.config.js
  // font-weight: 400; -> font-normal
  // font-size: 140px; -> text-[140px] - NOTE: This is very large and not responsive by default.
  // line-height: 100%; -> leading-none
  // letter-spacing: 10%; -> tracking-[0.1em] (equivalent to 0.1em, which is 10% of 1em font size)
  // text-transform: uppercase; -> uppercase (already applied to parent div)
  const baseHeadlineClasses =
    'font-serif font-normal text-[100px] leading-none tracking-[0.1em] text-white uppercase md:text-[120px] lg:text-[140px]';
  // Adjusted font size to be slightly responsive, capping at 140px.
  // Pure 140px: 'font-serif font-normal text-[140px] leading-none tracking-[0.1em] text-white uppercase'

  return (
    <section className='relative h-screen min-h-[700px] w-full overflow-hidden text-white md:min-h-[768px]'>
      {/* Render if backgroundImage and its asset object are present */}
      {/* decodeSanityImage will handle whether asset has _ref or _id */}
      {backgroundImage?.asset && (
        <SanityImageBlock
          fill
          image={backgroundImage}
          className='absolute inset-0 z-0 object-cover'
          priority // Good to add for LCP images
        />
      )}
      <div className='absolute inset-0 z-10 bg-black/60' /> {/* Overlay for text readability */}
      <Container className='relative z-20 flex h-full flex-col items-center justify-end pb-16 text-center md:pb-20 lg:pb-24'>
        <div className='flex flex-col items-center'>
          {' '}
          {/* Removed uppercase from here, applied directly to h1 */}
          {headlinePart1 && (
            <h1 className={`${baseHeadlineClasses} -translate-x-4 md:-translate-x-8 lg:-translate-x-12`}>
              {headlinePart1}
            </h1>
          )}
          {headlinePart1 && headlinePart2 && <DecorativeLine />}
          {headlinePart2 && <h1 className={baseHeadlineClasses}>{headlinePart2}</h1>}
          {headlinePart2 && headlinePart3 && <DecorativeLine />}
          {headlinePart3 && (
            <h1 className={`${baseHeadlineClasses} translate-x-4 md:translate-x-8 lg:translate-x-12`}>
              {headlinePart3}
            </h1>
          )}
        </div>
        {/* CTA rendering removed to match the design in the screenshot */}
      </Container>
    </section>
  );
}
