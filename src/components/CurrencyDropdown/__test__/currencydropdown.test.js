import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import CurrencyDropdown from '../CurrencyDropdown';

describe('<CurrencyDropdown /> spec', () => {
  it('renders the empty component', () => {
    const container = render(
      <Provider store={store}>
        <CurrencyDropdown />
      </Provider>
    );
    expect(container.children).toMatchSnapshot();
  });
});
