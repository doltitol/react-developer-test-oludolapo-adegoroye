import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CountButton from '../CountButton';

describe('<CountButton /> spec', () => {
  it('renders the component', () => {
    const container = render(<CountButton text='+' />);
    const getByTestId = container.getByTestId;
    const countButton = getByTestId('count-button');
    expect(countButton.textContent).toEqual('+');
    expect(countButton).toHaveClass('count-button');
    expect(countButton).toHaveStyle('fontSize: 40px');
    expect(container.children).toMatchSnapshot();
  });
});
