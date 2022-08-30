import React, { PureComponent } from 'react';

export class ColorButton extends PureComponent {
  render() {
    return (
      <button
        className='color-button'
        style={{
          border: this.props.active ? '2px solid #5ECE7B' : 'none',
        }}
        onClick={this.props.onClick}
      >
        <div
          style={{
            background: this.props.color,
          }}
        ></div>
      </button>
    );
  }
}

export default ColorButton;
