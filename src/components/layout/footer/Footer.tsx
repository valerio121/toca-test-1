import Container from '@/components/layout/Container';
import { extractUrl } from '@/libs/functions';
import { sanityFetch } from '@/sanity/lib/client';
import { FOOTER_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { FooterSettings, SanityLink as SanityLinkType } from '@/sanity/types';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa'; // Example icon
import NewsletterSignup from './NewsletterSignup'; // Added import

// Import cn if not already there

async function FooterContent() {
  const footerData: FooterSettings = await sanityFetch({
    query: FOOTER_SETTINGS_QUERY,
    tags: ['footerSettings'], // Tag for revalidation if needed
  });

  if (!footerData) {
    return null; // Or a minimal fallback footer
  }

  const {
    navigationColumns,
    socialMediaLink,
    legalLinks,
    brandMarkText,
    newsletterEnable,
    newsletterTitle,
    newsletterSubtitle,
    newsletterLocations,
    // newsletterFormAction
  } = footerData || {}; // Destructure from footerData or empty object to avoid errors if footerData is null

  return (
    <>
      {newsletterEnable && (
        <NewsletterSignup
          title={newsletterTitle}
          subtitle={newsletterSubtitle}
          locations={newsletterLocations}
          // formAction={newsletterFormAction} // Pass if you implement form submission URL
        />
      )}
      <footer className='bg-black py-16 text-gray-400 md:py-20 lg:py-24'>
        <Container>
          {/* Top part with social icon and nav columns */}
          <div className='grid grid-cols-12 gap-8'>
            {/* Social Icon */}
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

            {/* Navigation Columns - Adjust span to allow space for social and potential right gap if any */}
            <nav className='col-span-12 grid grid-cols-1 gap-8 text-center sm:grid-cols-3 md:col-span-11 md:text-left lg:col-span-10 xl:col-span-9'>
              {navigationColumns?.map((column) => (
                <div key={column._key}>
                  {/* column.title could be rendered here if needed */}
                  <ul role='list' className='space-y-3 md:space-y-4'>
                    {column.links?.map((link: SanityLinkType) => (
                      <li key={link.title + (link.internal?.slug?.current || link.external)}>
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
            {/* Optional: Right spacer if nav columns don't fill up to 11/10/9 spans, or remove if not needed */}
            {/* <div className='hidden lg:col-span-1 xl:col-span-2'></div> */}
          </div>

          {/* Bottom Bar */}
          <div className='mt-16 flex flex-col items-center justify-between border-t border-gray-700/50 pt-10 text-xs sm:flex-row md:mt-20 md:pt-12'>
            <ul className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:gap-x-6'>
              {legalLinks?.map((link) => (
                <li key={link.title + (link.internal?.slug?.current || link.external)}>
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
    </>
  );
}

export default FooterContent;
