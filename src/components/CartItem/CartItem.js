import React, { PureComponent } from 'react';
import './cartitem.style.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuantity, removeQuantity } from '../../redux/actions/cartActions';
import AttributeButton from '../Buttons/AttributeButton';
import ColorButton from '../Buttons/ColorButton';
import CountButton from '../Buttons/CountButton';
import CartImageSlider from '../CartImageSlider/CartImageSlider';
import { numberCommaFormatter } from '../../util';

export class CartItem extends PureComponent {
  render() {
    const pricing = this.props.cartItem.prices.filter(
      (price) => price.currency.symbol === this.props.currency
    );
    const color = this.props.cartItem.attributes.filter(
      (attr) => attr.id === 'Color'
    )
      ? this.props.cartItem.attributes.filter((attr) => attr.id === 'Color')
      : null;
    const size = this.props.cartItem.attributes.filter(
      (attr) => attr.id === 'Size' || attr.id === 'Capacity'
    )
      ? this.props.cartItem.attributes.filter((attr) => attr.id !== 'Color')
      : null;
    return (
      <div className='cart-item' data-testid='cart-item'>
        <div className='cart-item-details'>
          <Link
            to={`/product/${this.props.cartItem.id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <p className='cart-item-details-brand'>
              {this.props.cartItem.brand}
            </p>
          </Link>
          <Link
            to={`/product/${this.props.cartItem.id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <p className='cart-item-details-name'>{this.props.cartItem.name}</p>
          </Link>
          <p className='cart-item-details-pricing'>
            {pricing[0].currency.symbol}{' '}
            {numberCommaFormatter(pricing[0].amount)}
          </p>
          {size.length !== 0 && (
            <div className='cart-item-details-attribute'>
              <p className='cart-item-details-attribute-text'>
                {size[0].name}:
              </p>
              <div className='cart-item-details-attribute-items'>
                {size[0].items.map((attribute) => (
                  <div
                    key={attribute.id}
                    className='cart-item-details-attribute-items-item'
                  >
                    <AttributeButton
                      text={attribute.value}
                      active={
                        this.props.cartItem.activeAttribute === attribute.id
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {color.length !== 0 && (
            <div className='cart-item-details-attribute'>
              <p className='cart-item-details-attribute-text'>
                {color[0].name}:
              </p>
              <div className='cart-item-details-attribute-items'>
                {color[0].items.map((color) => (
                  <div
                    key={color.id}
                    className='cart-item-details-attribute-items-item'
                  >
                    <ColorButton
                      color={color.value}
                      active={this.props.cartItem.activeColor === color.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className='cart-item-buttons'>
          <CountButton
            text='+'
            onClick={() => this.props.addQuantity(this.props.cartItem)}
          />
          <p className='cart-item-buttons-text'>{this.props.cartItem.qty}</p>
          <CountButton
            text='-'
            onClick={() => this.props.removeQuantity(this.props.cartItem)}
          />
        </div>
        <div className='cart-item-Image'>
          <CartImageSlider gallery={this.props.cartItem.gallery} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
