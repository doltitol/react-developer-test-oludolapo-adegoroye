import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import CartItem from '../CartItem';

describe('<CartItem /> spec', () => {
  it('renders the empty component', () => {
    const props = {
      cartItem: {
        __typename: 'Product',
        id: 'apple-iphone-12-pro',
        name: 'iPhone 12 Pro',
        inStock: true,
        gallery: [
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000',
        ],
        description: 'This is iPhone 12. Nothing else to say.',
        category: 'tech',
        attributes: [
          {
            __typename: 'AttributeSet',
            id: 'Capacity',
            name: 'Capacity',
            type: 'text',
            items: [
              {
                __typename: 'Attribute',
                displayValue: '512G',
                value: '512G',
                id: '512G',
              },
              {
                __typename: 'Attribute',
                displayValue: '1T',
                value: '1T',
                id: '1T',
              },
            ],
          },
          {
            __typename: 'AttributeSet',
            id: 'Color',
            name: 'Color',
            type: 'swatch',
            items: [
              {
                __typename: 'Attribute',
                displayValue: 'Green',
                value: '#44FF03',
                id: 'Green',
              },
              {
                __typename: 'Attribute',
                displayValue: 'Cyan',
                value: '#03FFF7',
                id: 'Cyan',
              },
              {
                __typename: 'Attribute',
                displayValue: 'Blue',
                value: '#030BFF',
                id: 'Blue',
              },
              {
                __typename: 'Attribute',
                displayValue: 'Black',
                value: '#000000',
                id: 'Black',
              },
              {
                __typename: 'Attribute',
                displayValue: 'White',
                value: '#FFFFFF',
                id: 'White',
              },
            ],
          },
        ],
        prices: [
          {
            __typename: 'Price',
            currency: {
              __typename: 'Currency',
              label: 'USD',
              symbol: '$',
            },
            amount: 1000.76,
          },
          {
            __typename: 'Price',
            currency: {
              __typename: 'Currency',
              label: 'GBP',
              symbol: '£',
            },
            amount: 719.34,
          },
          {
            __typename: 'Price',
            currency: {
              __typename: 'Currency',
              label: 'AUD',
              symbol: 'A$',
            },
            amount: 1290.99,
          },
          {
            __typename: 'Price',
            currency: {
              __typename: 'Currency',
              label: 'JPY',
              symbol: '¥',
            },
            amount: 108074.6,
          },
          {
            __typename: 'Price',
            currency: {
              __typename: 'Currency',
              label: 'RUB',
              symbol: '₽',
            },
            amount: 75680.48,
          },
        ],
        brand: 'Apple',
        activeColor: 'Green',
        activeAttribute: '512G',
        qty: 1,
        cartId: 2,
      },
    };
    const container = render(
      <Provider store={store}>
        <BrowserRouter>
          <CartItem {...props} />
        </BrowserRouter>
      </Provider>
    );
    const getByTestId = container.getByTestId;
    const cartItem = getByTestId('cart-item');
    expect(cartItem.children).toHaveLength(3);
    expect(container.children).toMatchSnapshot();
  });
});
