import React, { PureComponent } from 'react';
import './cart.style.scss';
import { connect } from 'react-redux';
import { addQuantity, removeQuantity } from '../../redux/actions/cartActions';
import { numberCommaFormatter } from '../../util';
import MainButton from '../../components/Buttons/MainButton';
import CartItem from '../../components/CartItem/CartItem';


export class Cart extends PureComponent {
  getTotal = () => {
    const tax = 21;
    const total = this.props.cartItems.reduce(
      (acc, cur) =>
        acc +
        cur.prices.filter(
          (price) => price.currency.symbol === this.props.currency
        )[0].amount *
          cur.qty,
      0
    );
    const taxAmount = total * (tax / 100);
    return {
      tax,
      taxAmount,
      total,
    };
  };
  render() {
    return (
      <div className='cart' ref={this.cartRef}>
        <h1 className='cart-heading'>cart</h1>
        <div className='cart-cartList'>
          {this.props.cartItems.length === 0 && (
            <div className='cart-cartList-empty'>
              <h1 data-testid='empty-text'>Your cart is empty!</h1>
            </div>
          )}
          {this.props.cartItems.map((item, index) => (
            <CartItem cartItem={item} key={`${item.id}-${index}`} />
          ))}
        </div>
        <div className='cart-cartTotal'>
          <div className='cart-cartTotal-item'>
            <div className='cart-cartTotal-item-heading'>
              <p>Tax {this.getTotal().tax}%:</p>
            </div>
            <div className='cart-cartTotal-item-amount'>
              <p>
                {this.props.currency}
                {numberCommaFormatter(this.getTotal().taxAmount.toFixed(2))}
              </p>
            </div>
          </div>
          <div className='cart-cartTotal-item'>
            <div className='cart-cartTotal-item-heading'>
              <p>Quantity</p>
            </div>
            <div className='cart-cartTotal-item-amount'>
              <p>{this.props.cartQuantity}</p>
            </div>
          </div>
          <div className='cart-cartTotal-item'>
            <div className='cart-cartTotal-item-heading'>
              <p>Total</p>
            </div>
            <div className='cart-cartTotal-item-amount'>
              <p>
                {this.props.currency}
                {numberCommaFormatter(this.getTotal().total.toFixed(2))}
              </p>
            </div>
          </div>
          <div className='cart-cartTotal-button'>
            <MainButton
              text='order'
              onClick={() => {}}
              height='43px'
              width='279px'
            />
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
const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (product) => {
      dispatch(addQuantity(product));
    },
    removeQuantity: (product) => {
      dispatch(removeQuantity(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
