import { defineField, defineType } from 'sanity';

export const tripleContentGridSection = defineType({
  name: 'tripleContentGridSection',
  title: 'Triple Content Grid Section',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [{ type: 'contentBlockItem' }], // Reference to our existing contentBlockItem object type
      validation: (rule) => rule.required().min(3).max(3),
      description: 'Requires exactly three items for the grid display.',
    }),
    // You could add a general title for the whole section if needed, e.g.:
    // defineField({
    //   name: 'sectionTitle',
    //   title: 'Section Title',
    //   type: 'string',
    //   description: 'Optional title for the entire grid section.',
    // }),
  ],
  preview: {
    select: {
      item1Title: 'items.0.title',
      item2Title: 'items.1.title',
      item3Title: 'items.2.title',
      item1Media: 'items.0.backgroundImage',
    },
    prepare({ item1Title, item2Title, item3Title, item1Media }) {
      const titles = [item1Title, item2Title, item3Title].filter(Boolean);
      const displayTitle = titles.length > 0 ? titles.join(', ') : 'Triple Content Grid Section';
      return {
        title: displayTitle,
        subtitle: `${titles.length} item(s)`,
        media: item1Media, // Show first item's image in preview
      };
    },
  },
});

export default tripleContentGridSection;
