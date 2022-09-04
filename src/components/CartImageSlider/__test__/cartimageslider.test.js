import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import CartImageSlider from '../CartImageSlider';

describe('<CartImageSlider /> spec', () => {
  it('renders the empty component', () => {
    const props = {
      gallery: [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000',
      ],
    };
    const container = render(
      <Provider store={store}>
        <BrowserRouter>
          <CartImageSlider {...props} />
        </BrowserRouter>
      </Provider>
    );
    const getByTestId = container.getByTestId;
    const cartImageSlider = getByTestId('cart-image-slider');
    expect(cartImageSlider.children).toHaveLength(1);
    expect(container.children).toMatchSnapshot();
  });
});
