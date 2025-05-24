import Container from '@/components/layout/Container';
import { extractUrl } from '@/libs/functions';
import type { SocialFollowSection } from '@/sanity/types';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa'; // Example icon

interface SocialFollowSectionProps {
  section: SocialFollowSection;
}

export default function SocialFollowSectionComponent({ section }: SocialFollowSectionProps) {
  const { eyebrow, title, cta } = section;

  return (
    <section className='bg-black py-16 text-white md:py-24'>
      <Container className='text-center'>
        {eyebrow && <p className='mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase'>{eyebrow}</p>}
        {title && <h2 className='mx-auto mb-8 max-w-2xl font-serif text-3xl md:text-4xl'>{title}</h2>}
        {cta && (cta.internal?.slug?.current || cta.external) && (
          <Link
            href={extractUrl(cta)}
            target={cta.isNewWindow ? '_blank' : '_self'}
            className='inline-flex items-center gap-2 rounded-full border border-gray-400 px-8 py-3 text-sm font-medium text-gray-200 transition hover:border-white hover:text-white'
          >
            <FaInstagram className='h-4 w-4' /> {/* Example Icon Usage */}
            <span>{cta.title || 'Follow Us'}</span>
          </Link>
        )}
      </Container>
    </section>
  );
}
