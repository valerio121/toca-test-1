import type { Page } from '@/sanity/types';
import HomeHeroSection from '../sections/HomeHeroSection';

const sections = {
  homeHeroSection: HomeHeroSection,
};

export function SectionRenderer({ section }: { section: Page['sections'][number] }) {
  const { _type } = section;

  const SectionComponent = sections[_type];

  if (!SectionComponent) {
    console.warn(`No component found for section type: ${_type}`);
    return null;
  }

  return <SectionComponent {...section} />;
}
