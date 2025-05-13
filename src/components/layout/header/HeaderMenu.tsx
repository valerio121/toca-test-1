import Container from '@/components/layout/Container';
import SanityImageBlock from '@/components/utility/SanityImageBlock';
import { extractUrl } from '@/libs/functions';
import type { HeaderNav } from '@/sanity/types';
import Link from 'next/link';

export default function HeaderMenu({ data }: { data: HeaderNav }) {
  const { backgroundImage, mainNav, secondaryNav } = data;

  return (
    <nav className='relative h-full bg-black'>
      <div className='relative z-20 h-full w-full'>
        <Container className='h-full'>
          <div className='flex h-full flex-col'>
            <div className='flex-1 pt-10 md:pt-14' />
            <div className='flex flex-col items-center justify-center gap-8 md:gap-12'>
              {mainNav.map((item, index) => (
                <Link
                  key={index}
                  target={item.isNewWindow ? '_blank' : undefined}
                  href={extractUrl(item)}
                  className='text-center font-serif text-4xl leading-none tracking-widest uppercase md:text-[4rem]'
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className='flex flex-1 flex-col justify-end pb-10 md:pb-14'>
              <div className='grid grid-cols-2 gap-x-7 gap-y-5 md:flex md:flex-row md:justify-center md:gap-7'>
                {secondaryNav.map((item, index) => (
                  <Link
                    key={index}
                    target={item.isNewWindow ? '_blank' : undefined}
                    href={extractUrl(item)}
                    className='text-sm font-medium tracking-widest uppercase'
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <SanityImageBlock fill image={backgroundImage} className='z-0 object-cover opacity-40' />
    </nav>
  );
}
