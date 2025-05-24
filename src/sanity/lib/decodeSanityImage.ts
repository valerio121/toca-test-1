import type { SanityImage, SanityImageAsset, SanityImageReference } from '../types';
import urlFor from './urlFor';

const pattern = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/;

// Type guard to check if asset is a SanityImageReference
function isSanityImageReference(asset: unknown): asset is SanityImageReference {
  return (
    typeof asset === 'object' &&
    asset !== null &&
    typeof (asset as SanityImageReference)._ref === 'string' &&
    (asset as SanityImageReference)._type === 'reference'
  );
}

// Type guard to check if asset is a SanityImageAsset (resolved)
function isSanityImageAsset(asset: unknown): asset is SanityImageAsset {
  return (
    typeof asset === 'object' &&
    asset !== null &&
    typeof (asset as SanityImageAsset)._id === 'string' &&
    (asset as SanityImageAsset)._type === 'sanity.imageAsset'
  );
}

export default function processImage(source: SanityImage) {
  if (!source || !source.asset) {
    console.error('[decodeSanityImage] Source or source.asset is missing:', JSON.stringify(source, null, 2));
    throw new Error(`Invalid Sanity image source: asset field is missing.`);
  }

  let id: string;

  if (isSanityImageReference(source.asset)) {
    id = source.asset._ref;
  } else if (isSanityImageAsset(source.asset)) {
    id = source.asset._id;
  } else {
    console.error(
      '[decodeSanityImage] Asset is not a valid reference or resolved asset:',
      JSON.stringify(source.asset, null, 2)
    );
    throw new Error(`Sanity image asset is not a valid reference or a resolved asset document.`);
  }

  const match = pattern.exec(id);
  if (!match) {
    console.error('[decodeSanityImage] Asset ID did not match pattern. ID:', id);
    throw new Error(`Invalid asset ID format: ${id}`);
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
