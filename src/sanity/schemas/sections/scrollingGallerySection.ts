import { defineField, defineType } from 'sanity';

export const scrollingGallerySection = defineType({
  name: 'scrollingGallerySection',
  title: 'Scrolling Gallery Section',
  type: 'object',
  fields: [
    // Optional: Add a small decorative image/icon for the top center element if needed
    // defineField({
    //   name: 'decorativeIcon',
    //   title: 'Decorative Icon (Optional)',
    //   type: 'image',
    //   fields: [
    //     {
    //       name: 'alt',
    //       title: 'Alt Text',
    //       type: 'string',
    //       validation: (rule) => rule.required(),
    //     },
    //   ],
    // }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            // You could add a caption or link per image if desired
            // {
            //   name: 'caption',
            //   title: 'Caption',
            //   type: 'string',
            // },
            // {
            //   name: 'link',
            //   title: 'Link',
            //   type: 'sanityLink',
            // }
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
      description: 'Add images for the scrolling gallery.',
    }),
  ],
  preview: {
    select: {
      imageCount: 'galleryImages.length',
      firstImage: 'galleryImages.0.asset',
    },
    prepare({ imageCount, firstImage }) {
      return {
        title: 'Scrolling Gallery Section',
        subtitle: `${imageCount || 0} image(s)`,
        media: firstImage, // Show the first image as media in the preview
      };
    },
  },
});

export default scrollingGallerySection;
