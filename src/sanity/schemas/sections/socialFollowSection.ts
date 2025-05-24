import { defineField, defineType } from 'sanity';

export const socialFollowSection = defineType({
  name: 'socialFollowSection',
  title: 'Social Follow Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'INSTAGRAM',
    }),
    defineField({
      name: 'title',
      title: 'Title / Main Text',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'sanityLink',
      description: 'e.g., Link to Instagram profile.',
      validation: (rule) => rule.required(),
    }),
    // Optional: Field for specific icon if not just Instagram
    // defineField({
    //   name: 'iconName',
    //   title: 'Icon Name (Optional)',
    //   type: 'string',
    //   description: 'If using a specific icon library, e.g., name of react-icons icon'
    // })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Social Follow Section',
        subtitle: subtitle || '',
      };
    },
  },
});

export default socialFollowSection;
