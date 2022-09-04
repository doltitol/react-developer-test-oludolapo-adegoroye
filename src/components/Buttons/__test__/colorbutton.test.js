import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ColorButton from '../ColorButton';

describe('<ColorButton /> spec', () => {
  it('renders the component', () => {
    const container = render(<ColorButton color={'#1D1F22'} active={true} />);
    const getByTestId = container.getByTestId;
    const colorButton = getByTestId('color-button');
    expect(colorButton.children[0]).toHaveStyle('background: #1D1F22');
    expect(colorButton).toHaveStyle('border: 2px solid #5ECE7B');
    expect(colorButton).toHaveStyle('width: 40px');
    expect(container.children).toMatchSnapshot();
  });
});
