// If you have specific metadata for the Studio, you can define it here
// export const metadata: Metadata = {
//   title: 'Sanity Studio - Toca Madera',
//   description: 'Content management for Toca Madera.',
// };

// This layout can remain a Server Component
// Re-export metadata and viewport from next-sanity/studio here
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
