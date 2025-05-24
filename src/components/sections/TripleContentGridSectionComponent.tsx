import type { TripleContentGridSection } from '@/sanity/types';
import ContentBlockItemDisplay from './blocks/ContentBlockItemDisplay';

interface TripleContentGridSectionProps {
  section: TripleContentGridSection;
}

export default function TripleContentGridSectionComponent({ section }: TripleContentGridSectionProps) {
  const { items } = section;

  console.log('section : ', section);
  // const { items, sectionTitle } = section; // If you added a sectionTitle

  if (!items || items.length !== 3) {
    console.warn('TripleContentGridSection expects exactly three items.');
    return null;
  }

  return (
    <section className='bg-black py-12 md:py-16'>
      {' '}
      {/* Example background, adjust as needed */}
      {/* {sectionTitle && ( 
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-12">{sectionTitle}</h2>
      )} */}
      <div className='grid gap-px overflow-hidden md:grid-cols-3 md:gap-0'>
        {' '}
        {/* Use gap-px for thin lines if items have bg, or adjust */}
        {items.map((item) => (
          <ContentBlockItemDisplay key={item._key} block={item} />
        ))}
      </div>
    </section>
  );
}
