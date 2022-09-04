import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Pages from '../';
import React from 'react';
describe('<Pages /> spec', () => {
  it('renders the component', () => {
    const container = render(
      <Provider store={store}>
        <Pages />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
