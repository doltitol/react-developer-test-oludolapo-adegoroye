import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

const API_URL = `http://localhost:4000/`;
const link = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      accept: 'application/json',
    },
  };
});

export const client = new ApolloClient({
  link: link.concat(new HttpLink({uri: API_URL, fetch})),
  cache: new InMemoryCache(),
});
