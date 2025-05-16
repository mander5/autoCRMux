import { GraphQLClient } from 'graphql-request';

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
console.log('Space ID:', SPACE_ID);
console.log('Access Token:', ACCESS_TOKEN);

export const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
  {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }
);
