import Container from '@/components/layout/Container';
import SanityImageBlock from '@/components/utility/SanityImageBlock';
import { extractUrl } from '@/libs/functions';
import type { ProductGridItem as ProductGridItemType, ProductGridSection } from '@/sanity/types';
import Link from 'next/link';

interface ProductItemProps {
  item: ProductGridItemType;
}

function ProductItem({ item }: ProductItemProps) {
  const { title, image } = item; // Assuming no link per item for now

  return (
    <div className='group relative flex flex-col items-center text-center'>
      {image?.asset && (
        <div className='relative mb-4 h-80 w-full overflow-hidden rounded-md md:h-96'>
          <SanityImageBlock
            image={image}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
      )}
      {title && <h3 className='font-serif text-xl text-white italic md:text-2xl'>{title}</h3>}
      {/* {item.link && ... render link here ...} */}
    </div>
  );
}

interface ProductGridSectionProps {
  section: ProductGridSection;
}

export default function ProductGridSectionComponent({ section }: ProductGridSectionProps) {
  const { eyebrow, title, description, cta, items } = section;

  return (
    <section className='bg-black py-16 text-white md:py-24'>
      <Container>
        <div className='mx-auto mb-12 max-w-3xl text-center'>
          {eyebrow && <p className='mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase'>{eyebrow}</p>}
          {title && <h2 className='mb-4 font-serif text-4xl md:text-5xl'>{title}</h2>}
          {description && <p className='text-lg text-gray-300 md:text-xl'>{description}</p>}
          {cta && (cta.internal?.slug?.current || cta.external) && (
            <Link
              href={extractUrl(cta)}
              target={cta.isNewWindow ? '_blank' : '_self'}
              className='mt-8 inline-block rounded-full border border-gray-400 px-8 py-3 text-sm font-medium text-gray-200 transition hover:border-white hover:text-white'
            >
              {cta.title || 'Learn More'}
            </Link>
          )}
        </div>

        {items && items.length > 0 && (
          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {items.map((item) => (
              <ProductItem key={item._key} item={item} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
