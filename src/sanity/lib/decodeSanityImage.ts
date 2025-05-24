import type { SanityImage, SanityImageAsset, SanityImageReference } from '../types';
import urlFor from './urlFor';

const pattern = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/;

// Type guard to check if asset is a SanityImageReference
function isSanityImageReference(asset: any): asset is SanityImageReference {
  return asset && typeof asset._ref === 'string' && asset._type === 'reference';
}

// Type guard to check if asset is a SanityImageAsset (resolved)
function isSanityImageAsset(asset: any): asset is SanityImageAsset {
  return asset && typeof asset._id === 'string' && asset._type === 'sanity.imageAsset';
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
