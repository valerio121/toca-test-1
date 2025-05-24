import type {
  ContentFeatureSection as ContentFeatureSectionType,
  DualContentSection as DualContentSectionType,
  HomeHeroSection as HomeHeroSectionType,
  Page,
  ProductGridSection as ProductGridSectionType,
  ScrollingGallerySection as ScrollingGallerySectionType,
  Section,
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

// Define a mapping from section _type to React component
const sectionComponents: Record<string, React.ComponentType<any>> = {
  homeHeroSection: HomeHeroSectionComponent,
  contentFeatureSection: ContentFeatureSectionComponent,
  dualContentSection: DualContentSectionComponent,
  tripleContentGridSection: TripleContentGridSectionComponent,
  productGridSection: ProductGridSectionComponent,
  socialFollowSection: SocialFollowSectionComponent,
  scrollingGallerySection: ScrollingGallerySectionComponent,
  // ... other section components will go here
};

export function SectionRenderer({ section }: { section: Section }) {
  // Use the Section union type directly
  // Early return if section or _type is somehow missing (defensive)
  if (!section || !section._type) {
    console.warn('SectionRenderer: Received invalid section data', section);
    return null;
  }

  const sectionType = section._type; // Store _type before switch narrows section type
  const SectionComponent = sectionComponents[sectionType];

  if (!SectionComponent) {
    console.warn(`SectionRenderer: No component found for section type: ${sectionType}`);
    return null;
  }

  // Type-specific rendering
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
      // This case is hit if sectionType is a key in sectionComponents
      // but not explicitly handled above.
      console.warn(
        `SectionRenderer: Section type "${sectionType}" is mapped to a component but not explicitly handled in the switch. 
        Rendering with generic prop spread.`
      );
      // We trust that if SectionComponent was found, it can handle the props from 'section'.
      // The 'section' object still conforms to one of the types in the Section union here,
      // but its specific type isn't narrowed by a case.
      return <SectionComponent {...(section as any)} />; // Cast to any for the spread as a last resort
  }
}
