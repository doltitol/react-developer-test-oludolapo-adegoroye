import React, { PureComponent } from 'react';

export class CountButton extends PureComponent {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className='count-button'
        style={{
          width: this.props.small ? '24px' : '45px',
          height: this.props.small ? '24px' : '45px',
          fontSize: this.props.small ? '20px' : '40px',
        }}
      >
        {this.props.text}
      </button>
    );
  }
}

export default CountButton;
