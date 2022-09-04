import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import ProductItem from '../ProductItem';

describe('<ProductItem /> spec', () => {
  it('renders the empty component', () => {
    const container = render(
      <Provider store={store}>
        <ProductItem productId='apple-iphone-12-pro' />
      </Provider>
    );
    expect(container.children).toMatchSnapshot();
  });
});
