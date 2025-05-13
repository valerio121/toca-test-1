const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-01';

export { dataset, projectId, apiVersion };
