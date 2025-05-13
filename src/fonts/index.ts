import { Cormorant_Garamond } from 'next/font/google';
import localFont from 'next/font/local';

const brandonGrotesque = localFont({
  src: [
    {
      path: './BrandonGrotesque-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './BrandonGrotesque-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-brandon-grotesque',
  display: 'swap',
});

const karlGeoff = localFont({
  src: './KarlGeoff-Regular.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-karl-geoff',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cormorant',
});

export { brandonGrotesque, cormorant, karlGeoff };
