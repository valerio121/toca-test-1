import { defineField, defineType } from 'sanity';

const homeHeroSection = defineType({
  name: 'homeHeroSection',
  title: 'Hero Section (Home)',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'headlinePart1',
      title: 'Headline Part 1 (e.g., MODERN)',
      type: 'string',
    }),
    defineField({
      name: 'headlinePart2',
      title: 'Headline Part 2 (e.g., MEXICAN)',
      type: 'string',
    }),
    defineField({
      name: 'headlinePart3',
      title: 'Headline Part 3 (e.g., STEAKHOUSE)',
      type: 'string',
      description: 'This part will typically be larger.',
    }),
    // Removed subtitle and cta for now to match the specific design
  ],
  preview: {
    select: {
      title: 'headlinePart2', // Use middle part as a representative title
      subtitle: 'headlinePart3',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Section (Home)',
        subtitle: subtitle || '',
        media,
      };
    },
  },
});

export default homeHeroSection;
