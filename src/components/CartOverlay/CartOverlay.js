import React, { PureComponent } from 'react';
import { numberCommaFormatter } from '../../util';
import MainButton from '../Buttons/MainButton';
import CartOverlayItem from '../CartOverlayItem/CartOverlayItem';
import './cartoverlay.style.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class CartOverlay extends PureComponent {
  getTotal = () => {
    const cartTotal = this.props.cartItems.reduce(
      (acc, cur) =>
        acc +
        cur.prices.filter(
          (price) => price.currency.symbol === this.props.currency
        )[0].amount *
          cur.qty,
      0
    );
    return { total: cartTotal };
  };
  render() {
    return (
      <div data-testid='cart-overlay'>
        <div
          className='cart-overlay'
          onClick={() => this.props.closeCart()}
        ></div>
        <div className='cart-overlay-container slide-right'>
          <div className='cart-overlay-container-header'>
            <p className='cart-overlay-container-header-text'>
              <strong>My Bag</strong>, {this.props.cartQuantity} items
            </p>
          </div>
          <div className='cart-overlay-container-cart'>
            {this.props.cartItems.map((item, index) => (
              <CartOverlayItem
                cartItem={item}
                key={`${item.id}-${index}`}
                closeCart={() => this.props.closeCart()}
              />
            ))}
          </div>
          <div className='cart-overlay-container-total'>
            <p className='cart-overlay-container-total-text'>Total</p>
            <p className='cart-overlay-container-total-pricing'>
              {this.props.currency}
              {numberCommaFormatter(this.getTotal().total.toFixed(2))}
            </p>
          </div>
          <div className='cart-overlay-container-buttons'>
            <Link to={'/cart'} onClick={() => this.props.closeCart()}>
              <MainButton text='view bag' width='135px' height='43px' outline />
            </Link>
            <MainButton text='check out' width='135px' height='43px' />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    currency: state.cart.currency,
    cartQuantity: state.cart.cartQuantity,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps)(CartOverlay);
