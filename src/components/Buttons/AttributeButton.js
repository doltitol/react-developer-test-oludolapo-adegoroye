import React, { PureComponent } from 'react';

export class AttributeButton extends PureComponent {
  render() {
    return (
      <button
        className='attribute-button'
        style={{
          background: this.props.active ? '#1D1F22' : 'transparent',
          width: this.props.small ? '32px' : '63px',
          height: this.props.small ? '28px' : '45px',
          color: this.props.active ? '#FFFFFF' : '#1D1F22',
          fontSize: this.props.small ? '0.6em' : '1.1em',
        }}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default AttributeButton;
