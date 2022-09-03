import React, { PureComponent } from 'react';
import './cart.style.scss';
import { connect } from 'react-redux';
import { addQuantity, removeQuantity } from '../../redux/actions/cartActions';
import { numberCommaFormatter } from '../../util';
import MainButton from '../../components/Buttons/MainButton';
import CartItem from '../../components/CartItem/CartItem';

export class Cart extends PureComponent {
  render() {
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
    const taxAmount = total * (21 / 100);

    return (
      <div className='cart'>
        <h1 className='cart-heading'>cart</h1>
        <div className='cart-cartList'>
          {this.props.cartItems.map((item, index) => (
            <CartItem cartItem={item} key={`${item.id}-${index}`} />
          ))}
        </div>
        <div className='cart-cartTotal'>
          <div className='cart-cartTotal-item'>
            <div className='cart-cartTotal-item-heading'>
              <p>Tax{tax}%:</p>
            </div>
            <div className='cart-cartTotal-item-amount'>
              <p>
                {this.props.currency}
                {numberCommaFormatter(taxAmount.toFixed(2))}
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
                {numberCommaFormatter(total.toFixed(2))}
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