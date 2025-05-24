import { defineField, defineType } from 'sanity';

export const contentBlockItem = defineType({
  name: 'contentBlockItem',
  title: 'Content Block Item',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text appearing above the title (e.g., OUR STORY).',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text', // Using text for potentially longer titles that might wrap
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'sanityLink', // Reusing your existing sanityLink type
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Content Block Item',
        subtitle: subtitle || '',
        media,
      };
    },
  },
});

export default contentBlockItem;
