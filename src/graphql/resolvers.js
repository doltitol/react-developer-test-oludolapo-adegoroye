import { gql } from '@apollo/client';


const CATEGORIES = gql`
  query Categories {
    categories {
      name
    }
  }
`;

const CATEGORY = gql`
  query Category($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
      }
    }
  }
`;
const PRODUCT = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      category
      brand
      prices {
        currency {
          symbol
        }
        amount
      }
      attributes {
        id
        items {
          value
          id
        }
        name
      }
    }
  }
`;

const CURRENCIES = gql`
  query Currencies {
    currencies {
      label
      symbol
    }
  }
`;

export const allResolvers = {
  CATEGORY,
  CATEGORIES,
  CURRENCIES,
  PRODUCT,
};
