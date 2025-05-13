import { SectionRenderer } from '@/components/utility/SectionRenderer';
import { normalizeSlug, splitSlug } from '@/libs/functions';
import { sanityFetch } from '@/sanity/lib/client';
import { ROUTE_QUERY, ROUTES_QUERY } from '@/sanity/lib/queries';
import type { Route } from '@/sanity/types';
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
  const routes: Route[] = await sanityFetch({
    query: ROUTES_QUERY,
    tags: ['route'],
  });

  return routes.map((route) => ({
    slug: splitSlug(route.slug.current),
  }));
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;

  const route: Route = await sanityFetch({
    query: ROUTE_QUERY,
    params: { slug: normalizeSlug(slug) },
    tags: ['route'],
  });

  if (!route) {
    return notFound();
  }

  if (route.isRedirect) {
    return redirect(route.redirectRoute.slug.current);
  }

  return (
    <main>
      <>{route.page.sections?.map((section, index) => <SectionRenderer key={index} section={section} />)}</>
    </main>
  );
}
