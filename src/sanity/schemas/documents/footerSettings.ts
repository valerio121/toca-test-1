import { CogIcon, EnvelopeIcon } from '@sanity/icons'; // Added EnvelopeIcon
import { defineField, defineType } from 'sanity';

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    // Added groups for better organization in Sanity Studio
    { name: 'navigation', title: 'Main Footer Navigation & Links' },
    { name: 'newsletter', title: 'Newsletter Signup Section' },
  ],
  fields: [
    defineField({
      name: 'navigationColumns',
      title: 'Navigation Columns',
      type: 'array',
      of: [{ type: 'linkList' }],
      validation: (rule) => rule.max(3), // Max 3 columns as per design
      description: 'Define up to 3 columns of links for the footer navigation.',
      group: 'navigation',
    }),
    defineField({
      name: 'socialMediaLink',
      title: 'Social Media Link (e.g., Instagram)',
      type: 'sanityLink',
      // Consider adding a field for icon selection if more than one social icon is needed
      group: 'navigation',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links (Bottom Bar)',
      type: 'array',
      of: [{ type: 'sanityLink' }],
      description: 'Links like Privacy Policy, Terms of Use.',
      group: 'navigation',
    }),
    defineField({
      name: 'brandMarkText',
      title: 'Brand Mark Text (Bottom Right)',
      type: 'string',
      initialValue: 'NOBLE 33',
      group: 'navigation',
    }),
    // Optional: Add a field for the brand mark logo if it's an image
    // defineField({
    //   name: 'brandMarkLogo',
    //   title: 'Brand Mark Logo (Optional)',
    //   type: 'image',
    //   fields: [ { name: 'alt', title: 'Alt Text', type: 'string', validation: rule => rule.required() } ]
    // }),

    // Fields for Newsletter Signup Section
    defineField({
      name: 'newsletterEnable',
      title: 'Enable Newsletter Signup Section',
      type: 'boolean',
      initialValue: true,
      group: 'newsletter',
    }),
    defineField({
      name: 'newsletterTitle',
      title: 'Newsletter Title',
      type: 'string',
      initialValue: "Don't Miss Out",
      group: 'newsletter',
      hidden: ({ document }) => !document?.newsletterEnable,
    }),
    defineField({
      name: 'newsletterSubtitle',
      title: 'Newsletter Subtitle',
      type: 'text',
      initialValue: 'Stay up to date on all the events happening at Toca Madera',
      group: 'newsletter',
      hidden: ({ document }) => !document?.newsletterEnable,
    }),
    defineField({
      name: 'newsletterLocations',
      title: 'Newsletter Locations List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of locations for the dropdown selector (e.g., Los Angeles, Scottsdale, Las Vegas).',
      group: 'newsletter',
      hidden: ({ document }) => !document?.newsletterEnable,
      options: {
        layout: 'tags', // Makes adding locations easier
      },
    }),
    // Placeholder for form submission endpoint/action - this needs backend handling
    // defineField({
    //   name: 'newsletterFormAction',
    //   title: 'Newsletter Form Action URL',
    //   type: 'url',
    //   description: 'The URL where the newsletter signup form data will be sent.',
    //   group: 'newsletter',
    //   hidden: ({ document }) => !document?.newsletterEnable,
    // }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings',
      };
    },
  },
});

export default footerSettings;
