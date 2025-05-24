import { defineField, defineType } from 'sanity';

export const linkList = defineType({
  name: 'linkList',
  title: 'Link List',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Optional)',
      type: 'string',
      description: 'Optional title for this column of links in the Sanity Studio.',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'sanityLink' }], // Reusing your existing sanityLink type
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      linkCount: 'links.length',
    },
    prepare({ title, linkCount }) {
      return {
        title: title || 'Link List',
        subtitle: `${linkCount || 0} link(s)`,
      };
    },
  },
});

export default linkList;
