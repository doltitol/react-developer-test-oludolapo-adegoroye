import React, { PureComponent } from 'react';
import MainButton from '../Buttons/MainButton';
import './cartoverlay.style.scss';

export class CartOverlay extends PureComponent {
  render() {
    return (
      <div className='cart-overlay' onClick={this.props.closeCart}>
        <div className='cart-overlay-container slide-right'>
          <div className='cart-overlay-container-header'>
            <p className='cart-overlay-container-header-text'>
              <strong>My Bag</strong>, 0 items
            </p>
          </div>
          <div className='cart-overlay-container-cart'></div>
          <div className='cart-overlay-container-total'>
            <p className='cart-overlay-container-total-text'>Total</p>
            <p className='cart-overlay-container-total-pricing'>$200.00</p>
          </div>
          <div className='cart-overlay-container-buttons'>
            <MainButton text='view bag' width='135px' height='43px' outline />
            <MainButton text='check out' width='135px' height='43px' />
          </div>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
