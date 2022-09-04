import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

describe('<App /> spec', () => {
  it('renders the children component', () => {
    const container = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const getByTestId = container.getByTestId;
    const app = getByTestId('app-component');
    expect(app.children.length).toEqual(1);
  });
});
