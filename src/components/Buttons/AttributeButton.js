import React, { PureComponent } from 'react';

export class AttributeButton extends PureComponent {
  render() {
    return (
      <button
        className='attribute-button'
        style={{
          background: this.props.active ? '#1D1F22' : 'transparent',
          color: this.props.active ? '#FFFFFF' : '#1D1F22',
        }}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default AttributeButton;
