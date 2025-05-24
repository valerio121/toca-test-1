import { defineField, defineType } from 'sanity';

export const productGridItem = defineType({
  name: 'productGridItem',
  title: 'Product Grid Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
    // Optional: Add a link field if each item should be clickable to a detail page
    // defineField({
    //   name: 'link',
    //   title: 'Link',
    //   type: 'sanityLink',
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Product Grid Item',
        media,
      };
    },
  },
});

export default productGridItem;
