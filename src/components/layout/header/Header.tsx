import Container from '@/components/layout/Container';
import { sanityFetch } from '@/sanity/lib/client';
import { HEADER_NAV_QUERY } from '@/sanity/lib/queries';
import type { HeaderNav } from '@/sanity/types';
import Link from 'next/link';
import HeaderBackground from './HeaderBackground';
import HeaderClientWrap from './HeaderClientWrap';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';

export default async function Header() {
  const header_data: HeaderNav = await sanityFetch({
    query: HEADER_NAV_QUERY,
    tags: ['header'],
  });

  return (
    <header className='fixed inset-x-0 top-0 z-50 h-24 md:h-40'>
      <div className='relative z-20 h-full w-full'>
        <Container className='h-full'>
          <div className='flex h-full items-center justify-between'>
            <div className='order-last flex flex-1 justify-end md:order-none md:justify-start'>
              <HeaderClientWrap>
                <HeaderMenu data={header_data} />
              </HeaderClientWrap>
            </div>
            <div className='order-first md:order-none'>
              <Link href='/' className='flex items-center justify-center'>
                <HeaderLogo />
              </Link>
            </div>
            <div className='hidden flex-1 justify-end md:flex'>
              <Link href='#' className='tracking-widest uppercase'>
                Reservations
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <HeaderBackground />
    </header>
  );
}
