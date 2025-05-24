import SanityImageBlock from '@/components/utility/SanityImageBlock';
import { cn } from '@/libs/functions'; // Assuming cn is in this path
import type { SanityImage as SanityImageType, ScrollingGallerySection } from '@/sanity/types';

interface ScrollingGallerySectionProps {
  section: ScrollingGallerySection;
}

export default function ScrollingGallerySectionComponent({ section }: ScrollingGallerySectionProps) {
  const { galleryImages, decorativeIcon } = section;

  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <section className='relative bg-black py-16 md:py-20 lg:py-24'>
      {decorativeIcon?.asset && (
        <div className='mb-8 flex flex-col items-center'>
          <div className='relative h-10 w-10 md:h-12 md:w-12'>
            {/* 
              Replace with your actual SVG icon or use SanityImageBlock if it's a Sanity image.
              Example using a placeholder div, assuming an SVG might be more precise here.
              If using SanityImageBlock for the icon: 
              <SanityImageBlock image={decorativeIcon} layout="fill" objectFit="contain" alt={decorativeIcon.alt || 'Decorative Icon'} />
            */}
            <SanityImageBlock image={decorativeIcon} fill className='object-contain' />
          </div>
          {/* Vertical line */}
          <div className='mt-2 h-16 w-px bg-gray-600 md:h-20'></div>
        </div>
      )}

      {/* Scroll container with padding to allow peeking */}
      <div
        className={cn(
          'no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 sm:-mx-6 md:-mx-8 md:gap-6 lg:-mx-12 lg:gap-8',
          'px-4 sm:px-6 md:px-8 lg:px-12' // This padding creates the peeking effect
        )}
      >
        {galleryImages.map(
          (imageItem: SanityImageType, index: number) =>
            imageItem?.asset && (
              <div
                key={imageItem._key || index}
                className='group relative aspect-[3/4] w-48 flex-shrink-0 snap-center overflow-hidden rounded-xl shadow-lg md:w-60 lg:w-72 xl:w-80' // Using aspect ratio for consistent item shape
              >
                <SanityImageBlock
                  image={imageItem}
                  fill
                  className='object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                  sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                />
                {/* 
              Future enhancement: Overlay for caption or link if needed in schema 
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                {imageItem.caption && <p className="text-white text-sm">{imageItem.caption}</p>}
              </div>
              */}
              </div>
            )
        )}
      </div>
    </section>
  );
}

// Add this to your global CSS (e.g., src/styles/globals.css) to hide scrollbars:
/*
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;  
    scrollbar-width: none;    
}
*/
