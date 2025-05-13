import type { Metadata } from 'next';
import '@/styles/globals.css';
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
    <html lang='en'>
      <body className={`${brandonGrotesque.variable} ${cormorant.variable} ${karlGeoff.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
