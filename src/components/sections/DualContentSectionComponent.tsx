import type { DualContentSection } from '@/sanity/types';
import ContentBlockItemDisplay from './blocks/ContentBlockItemDisplay';

interface DualContentSectionProps {
  section: DualContentSection;
}

export default function DualContentSectionComponent({ section }: DualContentSectionProps) {
  const { contentBlocks } = section;

  if (!contentBlocks || contentBlocks.length !== 2) {
    console.warn('DualContentSection expects exactly two content blocks.');
    return null;
  }

  return (
    <section className='grid bg-black md:grid-cols-2'>
      {contentBlocks.map((block) => (
        <ContentBlockItemDisplay key={block._key} block={block} />
      ))}
    </section>
  );
}
