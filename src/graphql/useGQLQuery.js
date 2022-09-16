import { client } from '../config/apolloClient';
import { allResolvers } from './resolvers';

export const useGQLQuery = {
  categories: async function getCategories() {
    return await client.query({
      query: allResolvers.CATEGORIES,
      fetchPolicy: 'network-only',
    });
  },
  category: async function getCategory(category) {
    return await client.query({
      query: allResolvers.CATEGORY,
      variables: {
        input: {
          title: category,
        },
      },
      fetchPolicy: 'no-cache',
    });
  },
  product: async function getProduct(id) {
    return await client.query({
      query: allResolvers.PRODUCT,
      variables: {
        productId: id,
      },
      fetchPolicy: 'network-only',
    });
  },
  currencies: async function getCurrencies() {
    return await client.query({
      query: allResolvers.CURRENCIES,
    });
  },
};
