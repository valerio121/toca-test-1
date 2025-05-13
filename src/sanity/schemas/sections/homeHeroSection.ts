import { defineType } from 'sanity';

const homeHeroSection = defineType({
  name: 'homeHeroSection',
  title: 'Hero Section (Home)',
  type: 'object',
  fields: [
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero Section (Home)',
      };
    },
  },
});

export default homeHeroSection;
