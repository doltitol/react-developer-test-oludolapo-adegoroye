import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import Home from '../Home';
import Categories from '../../../Categories.json';

describe('<Home /> spec', () => {
  it('renders the component', () => {
    const props = {
      categories: Categories.data.categories,
      category: 'tech',
    };
    const container = render(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    );
    expect(container.children).toMatchSnapshot();
  });
});
