import type { PortableTextBlock } from '@portabletext/types'; // For rich text
import type { SanityImageObject as SanityImageObjectNative } from '@sanity/image-url/lib/types/types';

// Represents the Sanity asset reference object
export interface SanityImageReference {
  _type: 'reference';
  _ref: string;
}

// Define basic types for palette to avoid 'any'
export interface SanityImagePaletteSwatch {
  _type: 'sanity.imagePaletteSwatch';
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
}

export interface SanityImagePalette {
  _type: 'sanity.imagePalette';
  darkMuted?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
}

// Represents a fully resolved Sanity image asset document
export interface SanityImageAsset {
  _id: string;
  _type: 'sanity.imageAsset'; // Or specific asset type if known, e.g., 'sanity.imageAsset'
  url: string;
  path: string;
  assetId: string;
  extension: string;
  mimeType: string;
  size: number;
  metadata?: {
    // Optional metadata
    _type: 'sanity.imageMetadata';
    dimensions: {
      _type: 'sanity.imageDimensions';
      width: number;
      height: number;
      aspectRatio: number;
    };
    palette?: SanityImagePalette; // Changed from any to SanityImagePalette
    lqip?: string;
    blurHash?: string;
    hasAlpha?: boolean;
    isOpaque?: boolean;
  };
  // ... other fields that a resolved asset might have
}

// This is the main type for an image field from Sanity in your application.
// It can hold either a reference or a fully resolved asset for its 'asset' property.
export type SanityImage = Omit<SanityImageObjectNative, 'asset'> & {
  asset: SanityImageReference | SanityImageAsset;
  alt?: string;
};

export type Navigation = {
  mainNav: SanityLink[];
  secondaryNav: SanityLink[];
};

export type HeaderNav = Navigation & {
  backgroundImage: SanityImage;
};

export type SanityLink = {
  title: string;
  isExternal: boolean;
  isNewWindow: boolean;
  external?: string;
  internal?: Route;
};

export type Route = {
  slug: {
    current: string;
  };
} & (
  | {
      isRedirect: true;
      redirectRoute: Route;
      page?: never;
    }
  | {
      isRedirect: false;
      page: Page;
      redirectRoute?: never;
    }
);

export type Page = {
  title: string;
  sections: Section[];
};

type BaseSection = {
  _type: string;
  _key: string;
};

// Updated HomeHeroSection type
export type HomeHeroSection = BaseSection & {
  _type: 'homeHeroSection';
  backgroundImage: SanityImage;
  headlinePart1?: string;
  headlinePart2?: string;
  headlinePart3?: string;
  // subtitle and cta removed for this specific design
};

// New ContentFeatureSection type
export type ContentFeatureSection = BaseSection & {
  _type: 'contentFeatureSection';
  eyebrow?: string;
  title: string;
  description: PortableTextBlock[]; // Rich text
  image: SanityImage;
  imagePosition: 'left' | 'right' | 'background';
  cta?: SanityLink;
};

// New ContentBlockItem type (mirroring its schema fields)
export type ContentBlockItem = {
  _type: 'contentBlockItem';
  _key: string; // Arrays of objects in Sanity usually have a _key
  eyebrow?: string;
  title: string; // Was text in schema, using string for type, can be PortableTextBlock[] if rich text needed for title
  backgroundImage: SanityImage;
  cta: SanityLink;
};

// New DualContentSection type
export type DualContentSection = BaseSection & {
  _type: 'dualContentSection';
  contentBlocks: [ContentBlockItem, ContentBlockItem]; // Enforce exactly two items for type safety
};

// New TripleContentGridSection type
export type TripleContentGridSection = BaseSection & {
  _type: 'tripleContentGridSection';
  items: [ContentBlockItem, ContentBlockItem, ContentBlockItem]; // Enforce exactly three items
  // sectionTitle?: string; // If you added this field to the schema
};

// New ProductGridItem type
export type ProductGridItem = {
  _type: 'productGridItem';
  _key: string;
  title: string;
  image: SanityImage;
  // link?: SanityLink; // If added to schema
};

// New ProductGridSection type
export type ProductGridSection = BaseSection & {
  _type: 'productGridSection';
  eyebrow?: string;
  title?: string;
  description?: string; // Or PortableTextBlock[] if rich text
  cta?: SanityLink;
  items: ProductGridItem[];
};

// New SocialFollowSection type
export type SocialFollowSection = BaseSection & {
  _type: 'socialFollowSection';
  eyebrow?: string;
  title: string; // Was text in schema, using string for type here
  cta: SanityLink;
  // iconName?: string; // if added to schema
};

// New ScrollingGallerySection type
export type ScrollingGallerySection = BaseSection & {
  _type: 'scrollingGallerySection';
  // decorativeIcon?: SanityImage; // If added to schema
  galleryImages: (SanityImage & { _key: string })[]; // Array of SanityImage, each will have a _key from Sanity
};

// New LinkList type
export type LinkList = {
  _type: 'linkList';
  _key: string; // If used in an array, it will have a key
  title?: string;
  links: SanityLink[];
};

// Updated FooterSettings type
export type FooterSettings = {
  _type: 'footerSettings';
  navigationColumns?: LinkList[];
  socialMediaLink?: SanityLink;
  legalLinks?: SanityLink[];
  brandMarkText?: string;
  // brandMarkLogo?: SanityImage;

  // Newsletter fields
  newsletterEnable?: boolean;
  newsletterTitle?: string;
  newsletterSubtitle?: string;
  newsletterLocations?: string[];
  // newsletterFormAction?: string; // For actual submission endpoint
};

// Updated Section union type
export type Section =
  | HomeHeroSection
  | ContentFeatureSection
  | DualContentSection
  | TripleContentGridSection
  | ProductGridSection
  | SocialFollowSection
  | ScrollingGallerySection;
