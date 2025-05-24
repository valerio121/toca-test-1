import type {
  ContentFeatureSection as ContentFeatureSectionType,
  DualContentSection as DualContentSectionType,
  HomeHeroSection as HomeHeroSectionType,
  ProductGridSection as ProductGridSectionType,
  ScrollingGallerySection as ScrollingGallerySectionType,
  Section, // Use the Section union type
  SocialFollowSection as SocialFollowSectionType,
  TripleContentGridSection as TripleContentGridSectionType,
} from '@/sanity/types';
import ContentFeatureSectionComponent from '../sections/ContentFeatureSection';
import DualContentSectionComponent from '../sections/DualContentSectionComponent';
import HomeHeroSectionComponent from '../sections/HomeHeroSection';
import ProductGridSectionComponent from '../sections/ProductGridSectionComponent';
import ScrollingGallerySectionComponent from '../sections/ScrollingGallerySectionComponent';
import SocialFollowSectionComponent from '../sections/SocialFollowSectionComponent';
import TripleContentGridSectionComponent from '../sections/TripleContentGridSectionComponent';

// Define a more specific type for the props our section components expect
interface SectionComponentProps {
  section: Section; // All components take a prop 'section' which is one of the union types
}

const sectionComponents: Record<string, React.ComponentType<SectionComponentProps>> = {
  homeHeroSection: HomeHeroSectionComponent as React.ComponentType<SectionComponentProps>,
  contentFeatureSection: ContentFeatureSectionComponent as React.ComponentType<SectionComponentProps>,
  dualContentSection: DualContentSectionComponent as React.ComponentType<SectionComponentProps>,
  tripleContentGridSection: TripleContentGridSectionComponent as React.ComponentType<SectionComponentProps>,
  productGridSection: ProductGridSectionComponent as React.ComponentType<SectionComponentProps>,
  socialFollowSection: SocialFollowSectionComponent as React.ComponentType<SectionComponentProps>,
  scrollingGallerySection: ScrollingGallerySectionComponent as React.ComponentType<SectionComponentProps>,
};

export function SectionRenderer({ section }: { section: Section }) {
  if (!section || !section._type) {
    console.warn('SectionRenderer: Received invalid section data', section);
    return null;
  }

  const sectionType = section._type;
  const SectionComponent = sectionComponents[sectionType];

  if (!SectionComponent) {
    console.warn(`SectionRenderer: No component found for section type: ${sectionType}`);
    return null;
  }

  // The individual case type assertions are still useful for ensuring the correct specific section type is passed.
  switch (sectionType) {
    case 'homeHeroSection':
      return <SectionComponent section={section as HomeHeroSectionType} />;
    case 'contentFeatureSection':
      return <SectionComponent section={section as ContentFeatureSectionType} />;
    case 'dualContentSection':
      return <SectionComponent section={section as DualContentSectionType} />;
    case 'tripleContentGridSection':
      return <SectionComponent section={section as TripleContentGridSectionType} />;
    case 'productGridSection':
      return <SectionComponent section={section as ProductGridSectionType} />;
    case 'socialFollowSection':
      return <SectionComponent section={section as SocialFollowSectionType} />;
    case 'scrollingGallerySection':
      return <SectionComponent section={section as ScrollingGallerySectionType} />;
    default:
      console.warn(
        `SectionRenderer: Section type "${sectionType}" is mapped to a component but not explicitly handled in the switch. 
        Rendering with generic prop spread, assuming component expects 'section' prop.`
      );
      // Since all mapped components expect `section: Section`, we can pass it directly.
      // The `as any` for spread is removed. If a component truly had different prop spreading needs,
      // this default case would be problematic or would need more advanced type handling.
      return <SectionComponent section={section} />;
  }
}
