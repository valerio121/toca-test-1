import { defineField, defineType } from 'sanity';

export const productGridSection = defineType({
  name: 'productGridSection',
  title: 'Product Grid Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text', // Or array of blocks for rich text if needed
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'sanityLink',
      description: 'Optional button appearing below the description.',
    }),
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [{ type: 'productGridItem' }],
      validation: (rule) => rule.min(1),
      description: 'Add products/items to display in a grid.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      itemCount: 'items.length',
    },
    prepare({ title, subtitle, itemCount }) {
      return {
        title: title || 'Product Grid Section',
        subtitle: `${subtitle ? subtitle + ' | ' : ''}${itemCount || 0} item(s)`,
      };
    },
  },
});

export default productGridSection;
