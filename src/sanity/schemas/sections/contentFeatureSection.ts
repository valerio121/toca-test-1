import { defineField, defineType } from 'sanity';

export const contentFeatureSection = defineType({
  name: 'contentFeatureSection',
  title: 'Content Feature Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text that appears above the main title (optional).',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array', // For rich text
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Image Left, Text Right', value: 'left' },
          { title: 'Image Right, Text Left', value: 'right' },
          { title: 'Image as Background, Text Overlay', value: 'background' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'sanityLink', // Reusing your existing sanityLink type
      description: 'Optional call to action button.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Content Feature Section',
        subtitle: subtitle || '',
        media,
      };
    },
  },
});

export default contentFeatureSection;
