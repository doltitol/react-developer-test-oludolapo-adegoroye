import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import Cart from '../Cart';

describe('<Cart /> spec', () => {
  it('renders the empty component', () => {
    const cartItems = [];
    const container = render(
      <Provider store={store}>
        <Cart cartItems={cartItems} />
      </Provider>
    );
    const getByTestId = container.getByTestId;
    expect(getByTestId('empty-text').textContent).toEqual(
      'Your cart is empty!'
    );
    expect(container.children).toMatchSnapshot();
  });
});
