import Container from '@/components/layout/Container';
import { extractUrl } from '@/libs/functions';
import { sanityFetch } from '@/sanity/lib/client';
import { FOOTER_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { FooterSettings, LinkList, SanityLink as SanityLinkType } from '@/sanity/types';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import NewsletterSignup from './NewsletterSignup';

async function FooterContent() {
  const footerData: FooterSettings | null = await sanityFetch({
    query: FOOTER_SETTINGS_QUERY,
    tags: ['footerSettings'],
  });

  const {
    navigationColumns = [],
    socialMediaLink,
    legalLinks = [],
    brandMarkText = 'NOBLE 33',
    newsletterEnable = false,
    newsletterTitle = "Don't Miss Out",
    newsletterSubtitle = 'Stay up to date on all the events happening at Toca Madera',
    newsletterLocations = [],
  } = footerData || {};

  console.log('footerData', newsletterLocations);
  const allLinks: SanityLinkType[] = navigationColumns.reduce((acc: SanityLinkType[], currentColumn: LinkList) => {
    if (currentColumn.links) {
      return acc.concat(currentColumn.links);
    }
    return acc;
  }, []);

  const numColumns = 3;
  const finalColumns: SanityLinkType[][] = [];
  const linksToDistribute = allLinks.slice(0, 12);

  for (let i = 0; i < numColumns; i++) {
    const columnChunk = linksToDistribute.slice(i * 4, i * 4 + 4);
    if (columnChunk.length > 0) {
      finalColumns.push(columnChunk);
    }
  }

  return (
    <>
      <footer className='bg-black py-16 text-gray-400 md:py-20 lg:py-24'>
        <Container>
          <div className='grid grid-cols-12 gap-8'>
            <div className='col-span-12 text-center md:col-span-1 md:text-left'>
              {socialMediaLink && (socialMediaLink.internal?.slug?.current || socialMediaLink.external) && (
                <Link
                  href={extractUrl(socialMediaLink)}
                  target={socialMediaLink.isNewWindow ? '_blank' : '_self'}
                  aria-label={socialMediaLink.title || 'Instagram'}
                  className='inline-block text-gray-300 transition hover:text-white'
                >
                  <FaInstagram className='h-5 w-5 md:h-6 md:w-6' />
                </Link>
              )}
            </div>

            <nav className='col-span-12 grid grid-cols-1 gap-8 text-center sm:grid-cols-3 md:col-span-11 md:text-left lg:col-span-10 xl:col-span-9'>
              {finalColumns.map((columnLinks, columnIndex) => (
                <div key={`footer-col-${columnIndex}`}>
                  <ul role='list' className='space-y-3 md:space-y-4'>
                    {columnLinks.map((link) => (
                      <li key={link._key || link.title + (link.internal?.slug?.current || link.external)}>
                        <Link
                          href={extractUrl(link)}
                          target={link.isNewWindow ? '_blank' : '_self'}
                          className='font-serif text-base leading-relaxed text-gray-200 transition hover:text-white md:text-lg'
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className='mt-16 flex flex-col items-center justify-between border-t border-gray-700/50 pt-10 text-xs sm:flex-row md:mt-20 md:pt-12'>
            <ul className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:gap-x-6'>
              {legalLinks.map((link) => (
                <li key={link._key || link.title + (link.internal?.slug?.current || link.external)}>
                  <Link
                    href={extractUrl(link)}
                    target={link.isNewWindow ? '_blank' : '_self'}
                    className='font-medium tracking-wider text-gray-400 uppercase transition hover:text-white'
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            {brandMarkText && (
              <p className='mt-6 font-medium tracking-wider text-gray-500 uppercase sm:mt-0'>{brandMarkText}</p>
            )}
          </div>
        </Container>
      </footer>
      {newsletterEnable && (
        <NewsletterSignup title={newsletterTitle} subtitle={newsletterSubtitle} locations={newsletterLocations} />
      )}
    </>
  );
}

export default FooterContent;
