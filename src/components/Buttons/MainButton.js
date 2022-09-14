import React, { PureComponent } from 'react';
import './buttons.style.scss';

export class MainButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getBorder = () => {
    if (this.props.outline) {
      return '1px solid #1D1F22';
    } else if (this.props.disabled) {
      return 'rgba(94, 206, 123, 0.6)';
    } else {
      return '1px solid #5ECE7B';
    }
  };
  getColor = () => {
    if (this.props.outline) {
      return '#1D1F22';
    } else {
      return '#FFFFFF';
    }
  };
  getBackground = () => {
    if (this.props.outline) {
      return 'transparent';
    } else if (this.props.disabled) {
      return 'rgba(94, 206, 123, 0.6)';
    } else {
      return '#5ECE7B';
    }
  };
  render() {
    return (
      <button
        className='main-button'
        data-testid='main-button'
        style={{
          width: this.props.width,
          border: this.getBorder(),
          height: this.props.height,
          color: this.getColor(),
          background: this.getBackground(),
          cursor: this.props.cursor,
        }}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.props.text}
      </button>
    );
  }
}

export default MainButton;
