import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import Product from '../Product';

describe('<Product /> spec', () => {
  it('renders the component', () => {
    const props = {
      match: {
        params: {
          id: 'apple-imac-2021',
        },
      },
    };
    const container = render(
      <Provider store={store}>
        <Product {...props} />
      </Provider>
    );
    expect(container.children).toMatchSnapshot();
  });
});
