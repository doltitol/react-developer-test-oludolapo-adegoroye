import React, { PureComponent } from 'react';
import { Icons } from '../../assets/images/Icons';
import './cartimageslider.style.scss';

export class CartImageSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageCount: 0,
    };
  }
  handleLeftClick = (count) => {
    this.setState({
      imageCount: count === 0 ? this.props.gallery.length - 1 : count - 1,
    });
  };
  handleRightClick = (count) => {
    this.setState({
      imageCount: count === this.props.gallery.length - 1 ? 0 : count + 1,
    });
  };
  render() {
    return (
      <div className='cart-image-slider' data-testid='cart-image-slider'>
        <img
          src={this.props.gallery[this.state.imageCount]}
          alt=''
          className='cart-image-slider-image'
        />
        {this.props.gallery.length > 1 && (
          <div className='cart-image-slider-buttons'>
            <Icons.LeftArrow
              size={24}
              color='#000000'
              onClick={() => this.handleLeftClick(this.state.imageCount)}
            />
            <Icons.RightArrow
              size={24}
              color='#000000'
              onClick={() => this.handleRightClick(this.state.imageCount)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default CartImageSlider;
