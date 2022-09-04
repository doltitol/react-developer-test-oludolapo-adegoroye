import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AttributeButton from '../AttributeButton';

describe('<AttributeButton /> spec', () => {
  it('renders the component', () => {
    const container = render(<AttributeButton text='s' active={true} />);
    const getByTestId = container.getByTestId;
    const attributeButton = getByTestId('attribute-button');
    expect(attributeButton.textContent).toEqual('s');
    expect(attributeButton).toHaveStyle('background: #1D1F22');
    expect(attributeButton).toHaveStyle('color: #FFFFFF');
    expect(container.children).toMatchSnapshot();
  });
});
