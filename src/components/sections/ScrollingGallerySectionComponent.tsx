import SanityImageBlock from '@/components/utility/SanityImageBlock';
import { cn } from '@/libs/functions';
import type { SanityImage as SanityImageType, ScrollingGallerySection } from '@/sanity/types';

interface ScrollingGallerySectionProps {
  section: ScrollingGallerySection;
}

export default function ScrollingGallerySectionComponent({ section }: ScrollingGallerySectionProps) {
  const { galleryImages } = section;
  // const { galleryImages, decorativeIcon } = section; // If decorativeIcon is added

  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <section className='relative bg-black py-12 md:py-16'>
      {/* Optional: Decorative element at the top */}
      {/* {decorativeIcon?.asset && (
        <div className="mb-8 flex justify-center">
          <SanityImageBlock image={decorativeIcon} width={50} height={50} className="h-12 w-12" />
        </div>
      )} */}

      <div className='no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 md:gap-6 md:px-8 lg:gap-8 lg:px-12'>
        {galleryImages.map(
          (imageItem: SanityImageType & { _key: string }, index: number) =>
            imageItem?.asset && (
              <div
                key={imageItem._key || index}
                className='relative h-64 w-48 flex-shrink-0 snap-center overflow-hidden rounded-lg shadow-lg md:h-80 md:w-60 lg:h-96 lg:w-72'
              >
                <SanityImageBlock
                  image={imageItem}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw' // Example sizes for optimization
                />
                {/* Optional: Add caption or link overlay here */}
              </div>
            )
        )}
      </div>
    </section>
  );
}

// CSS for hiding scrollbar (optional, place in your global CSS or a style tag if needed):
/*
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none; 
    scrollbar-width: none; 
}
*/
