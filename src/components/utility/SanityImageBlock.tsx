import { cn } from '@/libs/functions';
import decodeSanityImage from '@/sanity/lib/decodeSanityImage';
import type { SanityImage } from '@/sanity/types';
import Image from 'next/image';

export default function SanityImageBlock({
  image,
  ...props
}: {
  image: SanityImage;
} & Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
  const sourceImage = decodeSanityImage(image);
  const { fill, width, height, className } = props;

  return (
    <Image
      src={sourceImage.url}
      className={cn(className)}
      alt={image.alt || ''}
      width={!fill ? width || sourceImage.dimensions.width : undefined}
      height={!fill ? height || sourceImage.dimensions.height : undefined}
      {...props}
    />
  );
}
