import React, { PureComponent } from 'react';
import './buttons.style.scss';

export class MainButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <button
        className='main-button'
        style={{
          width: this.props.width,
          border: this.props.outline
            ? '1px solid #1D1F22'
            : '1px solid #5ECE7B',
          height: this.props.height,
          color: this.props.outline ? '#1D1F22' : '#FFFFFF',
          background: this.props.outline ? 'transparent' : '#5ECE7B',
        }}
      >
        {this.props.text}
      </button>
    );
  }
}

export default MainButton;
