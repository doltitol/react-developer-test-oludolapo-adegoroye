import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import CartOverlay from '../CartOverlay';

describe('<CartOverlay /> spec', () => {
  it('renders the empty component', () => {
    const container = render(
      <Provider store={store}>
        <BrowserRouter>
          <CartOverlay />
        </BrowserRouter>
      </Provider>
    );
    const getByTestId = container.getByTestId;
    const cartOverlay = getByTestId('cart-overlay');
    expect(cartOverlay.children).toHaveLength(2);
    expect(container.children).toMatchSnapshot();
  });
});
