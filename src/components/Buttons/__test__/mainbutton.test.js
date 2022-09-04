import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainButton from '../MainButton';

describe('<MainButton /> spec', () => {
  it('renders the component', () => {
    const container = render(<MainButton text='hello' />);
    const getByTestId = container.getByTestId;
    const mainButton = getByTestId('main-button');
    expect(mainButton.textContent).toEqual('hello');
    expect(mainButton).toHaveStyle('background: rgb(94, 206, 123)');
    expect(container.children).toMatchSnapshot();
  });
});
