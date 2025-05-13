import { BsMenuButtonWideFill } from 'react-icons/bs';
import { defineType } from 'sanity';

const headerNav = defineType({
  name: 'headerNav',
  title: 'Header Navigation',
  type: 'document',
  icon: BsMenuButtonWideFill,
  fields: [
    {
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'sanityLink',
        },
      ],
    },
    {
      name: 'secondaryNav',
      title: 'Secondary Navigation',
      type: 'array',
      of: [
        {
          type: 'sanityLink',
        },
      ],
    },
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
});

export default headerNav;
