import type { SanityLink } from '@/sanity/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeSlug(slug?: string | string[]) {
  if (!slug) {
    return '/';
  }

  if (typeof slug === 'string') {
    return slug;
  }

  return `/${slug.join('/')}`;
}

export function splitSlug(slug: string): string[] {
  return slug.split('/').filter((part) => part !== '');
}

export function extractUrl(sanityLink: SanityLink): string {
  if (sanityLink.isExternal) {
    return sanityLink.external || '#';
  }

  if (sanityLink.internal) {
    return sanityLink.internal.slug.current;
  }

  return '#';
}
