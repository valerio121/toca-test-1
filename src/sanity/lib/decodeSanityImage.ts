import type { SanityImage } from '../types';
import urlFor from './urlFor';

const pattern = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/;

export default function processImage(source: SanityImage) {
  const id = source.asset._ref as string;

  const match = pattern.exec(id);
  if (!match) {
    throw new Error(`Invalid asset id: ${id}`);
  }

  const [, assetId, dimensions, format] = match;
  const [width, height] = dimensions.split('x').map((v) => parseInt(v, 10));

  return {
    url: urlFor(source).url(),
    alt: source.alt,
    assetId,
    dimensions: { width, height },
    format,
  };
}
