import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
});
