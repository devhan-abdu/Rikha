import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2023-06-25',
});

export default client;