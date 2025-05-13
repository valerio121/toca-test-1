import type { SanityDocument } from 'next-sanity';
import { RiRouteLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

const route = defineType({
  name: 'route',
  type: 'document',
  title: 'Routes',
  description: 'Map urls to pages',
  icon: RiRouteLine,
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (rule) =>
        rule.custom((value) => {
          if (value && value.current) {
            return value.current.startsWith('/') ? true : 'Slug must start with a /';
          }
          return true;
        }),
    }),
    defineField({
      name: 'isRedirect',
      type: 'boolean',
      title: 'Redirect to another route',
      initialValue: false,
    }),
    defineField({
      name: 'page',
      type: 'reference',
      description: 'Select the page that this route should point to',
      hidden: ({ parent }: { parent: { isRedirect: boolean } }) => parent?.isRedirect,
      to: [
        {
          type: 'page',
        },
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document!.isRedirect === false && !value) {
            return 'You must provide a page';
          }
          return true;
        }),
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'redirectRoute',
      type: 'reference',
      description: 'Select the route that this route should redirect to',
      hidden: ({ parent }: { parent: { isRedirect: boolean } }) => !parent?.isRedirect,
      to: [
        {
          type: 'route',
        },
      ],
      options: {
        filter: ({ document }) => {
          const { slug } = document as SanityDocument & { slug: { current: string } };

          return {
            filter: 'slug.current != $slugValue',
            params: {
              slugValue: slug.current,
            },
          };
        },
        disableNew: true,
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document!.isRedirect === true && !value) {
            return 'You must provide a redirect route';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      slug: 'slug.current',
    },
    prepare({ slug }: { slug: string }) {
      return {
        title: slug,
      };
    },
  },
});

export default route;
