import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import Navbar from '../Navbar';
import Categories from '../../../Categories.json';

describe('<Navbar /> spec', () => {
  it('renders the component', () => {
    const props = {
      categories: Categories.data.categories,
    };
    const container = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar {...props} />
        </BrowserRouter>
      </Provider>
    );
    const getByTestId = container.getByTestId;
    expect(getByTestId('links').children).toHaveLength(
      Categories.data.categories.length
    );
    expect(container.children).toMatchSnapshot();
  });
});
