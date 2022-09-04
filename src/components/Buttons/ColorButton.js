import React, { PureComponent } from 'react';

export class ColorButton extends PureComponent {
  render() {
    return (
      <button
        className='color-button'
        style={{
          border: this.props.active ? '2px solid #5ECE7B' : 'none',
          width: this.props.small ? '18px' : '40px',
          height: this.props.small ? '18px' : '40px',
        }}
        onClick={this.props.onClick}
        data-testid='color-button'
      >
        <div
          style={{
            background: this.props.color,
            width: this.props.small ? '15px' : '35px',
            height: this.props.small ? '15px' : '35px',
          }}
        ></div>
      </button>
    );
  }
}

export default ColorButton;
