import type { SanityImage } from '@/sanity/types';
import SanityImageBlock from '../utility/SanityImageBlock';

export default function HomeHeroSection({ backgroundImage }: { backgroundImage: SanityImage }) {
  return (
    <section>
      <SanityImageBlock priority image={backgroundImage} />
    </section>
  );
}
