import type { Metadata } from 'next';
import '@/styles/globals.css';
import FooterContent from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import { brandonGrotesque, cormorant, karlGeoff } from '@/fonts';

export const metadata: Metadata = {
  title: 'Toca Madera',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <body
        className={`${brandonGrotesque.variable} ${cormorant.variable} ${karlGeoff.variable} flex h-full flex-col antialiased`}
      >
        <Header />
        <main className='flex-grow'>{children}</main>
        <FooterContent />
      </body>
    </html>
  );
}
