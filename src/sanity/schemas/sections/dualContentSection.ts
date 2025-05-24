import { defineField, defineType } from 'sanity';

export const dualContentSection = defineType({
  name: 'dualContentSection',
  title: 'Dual Content Section',
  type: 'object',
  fields: [
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [{ type: 'contentBlockItem' }], // Reference to our new object type
      validation: (rule) => rule.required().min(2).max(2),
      description: 'Requires exactly two content blocks for side-by-side display.',
    }),
  ],
  preview: {
    select: {
      // Attempt to show titles from the first two blocks if available
      block1Title: 'contentBlocks.0.title',
      block2Title: 'contentBlocks.1.title',
      block1Media: 'contentBlocks.0.backgroundImage',
    },
    prepare({ block1Title, block2Title, block1Media }) {
      const title = [block1Title, block2Title].filter(Boolean).join(' | ') || 'Dual Content Section';
      return {
        title: title,
        media: block1Media, // Show first block's image in preview
      };
    },
  },
});

export default dualContentSection;
