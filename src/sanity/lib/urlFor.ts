import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client as sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

export default function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
