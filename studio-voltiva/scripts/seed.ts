import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2023-06-25',
});

async function seed() {
  const categories = [
    {
      _id: 'cat-smartphones',
      _type: 'category',
      name: 'Smartphones',
      slug: { _type: 'slug', current: 'smartphones' },
      description: 'Devices with powerful features and mobility.',
    },
    {
      _id: 'cat-accessories',
      _type: 'category',
      name: 'Accessories',
      slug: { _type: 'slug', current: 'accessories' },
      description: 'Complementary gadgets like AirPods or cases.',
    },
    {
      _id: 'cat-laptops',
      _type: 'category',
      name: 'Laptops',
      slug: { _type: 'slug', current: 'laptops' },
      description: 'Portable and powerful computing devices.',
    },
  ];

  const products = [
    {
      _type: 'product',
      title: 'iPhone 14 Pro',
      slug: { _type: 'slug', current: 'iphone-14-pro' },
      category: { _type: 'reference', _ref: 'cat-smartphones' },
      shortDescription: 'Apple flagship with Dynamic Island and A16 chip.',
      description: [
        { _type: 'block', children: [{ _type: 'span', text: 'The iPhone 14 Pro is a premium smartphone featuring advanced cameras and performance.' }] }
      ],
      brand: 'Apple',
      tags: ['iOS', 'flagship'],
      specs: [
        { label: 'Display', value: '6.1” Super Retina XDR' },
        { label: 'Battery', value: '3200mAh' },
      ],
    },
    {
      _type: 'product',
      title: 'Samsung Galaxy S23 Ultra',
      slug: { _type: 'slug', current: 'galaxy-s23-ultra' },
      category: { _type: 'reference', _ref: 'cat-smartphones' },
      shortDescription: 'Samsung top-end device with 200MP camera.',
      description: [
        { _type: 'block', children: [{ _type: 'span', text: 'Powerful Android phone with S Pen and long battery life.' }] }
      ],
      brand: 'Samsung',
      tags: ['Android', 'S-Pen'],
      specs: [
        { label: 'Display', value: '6.8” QHD+ AMOLED' },
        { label: 'Battery', value: '5000mAh' },
      ],
    },
    {
      _type: 'product',
      title: 'Apple AirPods Pro 2',
      slug: { _type: 'slug', current: 'airpods-pro-2' },
      category: { _type: 'reference', _ref: 'cat-accessories' },
      shortDescription: 'Next-gen AirPods with ANC and Spatial Audio.',
      description: [
        { _type: 'block', children: [{ _type: 'span', text: 'Great sound and noise cancellation in a compact form.' }] }
      ],
      brand: 'Apple',
      tags: ['audio', 'wireless'],
      specs: [
        { label: 'Battery', value: '6 hours' },
        { label: 'Noise Cancellation', value: 'Yes' },
      ],
    },
    {
      _type: 'product',
      title: 'Anker PowerCore 10000',
      slug: { _type: 'slug', current: 'anker-powercore-10000' },
      category: { _type: 'reference', _ref: 'cat-accessories' },
      shortDescription: 'Compact and powerful power bank.',
      description: [
        { _type: 'block', children: [{ _type: 'span', text: 'Fast charging with small form factor.' }] }
      ],
      brand: 'Anker',
      tags: ['charger', 'portable'],
      specs: [
        { label: 'Capacity', value: '10000mAh' },
        { label: 'Output', value: '12W' },
      ],
    },
    {
      _type: 'product',
      title: 'MacBook Air M2',
      slug: { _type: 'slug', current: 'macbook-air-m2' },
      category: { _type: 'reference', _ref: 'cat-laptops' },
      shortDescription: 'Lightweight, fanless laptop with Apple M2 chip.',
      description: [
        { _type: 'block', children: [{ _type: 'span', text: 'Ideal for students and professionals needing mobility and power.' }] }
      ],
      brand: 'Apple',
      tags: ['laptop', 'macOS'],
      specs: [
        { label: 'Processor', value: 'Apple M2' },
        { label: 'Display', value: '13.6” Retina' },
      ],
    },
    {
      _type: 'product',
      title: 'Dell XPS 13',
      slug: { _type: 'slug', current: 'dell-xps-13' },
      category: { _type: 'reference', _ref: 'cat-laptops' },
      shortDescription: 'Ultraportable laptop with InfinityEdge display.',
      description: [
        { _type: 'block', children: [{ _type: 'span', text: 'Compact and powerful, perfect for productivity.' }] }
      ],
      brand: 'Dell',
      tags: ['laptop', 'windows'],
      specs: [
        { label: 'Processor', value: 'Intel Core i7' },
        { label: 'RAM', value: '16GB' },
      ],
    },
  ];

  // Add _key to specs, description, and description[].children
  for (const product of products) {
    if (product.specs) {
      product.specs = product.specs.map(spec => ({ ...spec, _key: nanoid() }));
    }
    if (product.description) {
      product.description = product.description.map(block => {
        const blockWithKey = { ...block, _key: nanoid() };
        if (blockWithKey.children) {
          blockWithKey.children = blockWithKey.children.map(child => ({ ...child, _key: nanoid() }));
        }
        return blockWithKey;
      });
    }
  }

  await client.transaction()
    .createIfNotExists(categories[0])
    .createIfNotExists(categories[1])
    .createIfNotExists(categories[2])
    .commit();

  for (const product of products) {
    await client.create(product);
  }

  console.log('✅ Dummy data seeded successfully.');
}

seed().catch(console.error);
