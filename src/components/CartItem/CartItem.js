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
  getCartItemDetails = () => {
    const { id, brand, name, activeAttribute, activeColor, qty, gallery } =
      this.props.cartItem;
    const pricing = this.props.cartItem.prices.filter(
      (price) => price.currency.symbol === this.props.currency
    );
    const color = this.props.cartItem.attributes.filter(
      (attr) => attr.id === 'Color'
    );
    const size = this.props.cartItem.attributes.filter(
      (attr) => attr.id === 'Size' || attr.id === 'Capacity'
    );
    return {
      pricing,
      color: color ? color : null,
      size: size ? size : null,
      id,
      brand,
      name,
      activeAttribute,
      activeColor,
      qty,
      gallery,
    };
  };
  render() {
    return (
      <div className='cart-item' data-testid='cart-item'>
        <div className='cart-item-details'>
          <Link
            to={`/product/${this.getCartItemDetails().id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <p className='cart-item-details-brand'>
              {this.getCartItemDetails().brand}
            </p>
          </Link>
          <Link
            to={`/product/${this.getCartItemDetails().id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <p className='cart-item-details-name'>
              {this.getCartItemDetails().name}
            </p>
          </Link>
          <p className='cart-item-details-pricing'>
            {this.getCartItemDetails().pricing[0].currency.symbol}{' '}
            {numberCommaFormatter(this.getCartItemDetails().pricing[0].amount)}
          </p>
          {this.getCartItemDetails().size.length !== 0 && (
            <div className='cart-item-details-attribute'>
              <p className='cart-item-details-attribute-text'>
                {this.getCartItemDetails().size[0].name}:
              </p>
              <div className='cart-item-details-attribute-items'>
                {this.getCartItemDetails().size[0].items.map((attribute) => (
                  <div
                    key={attribute.id}
                    className='cart-item-details-attribute-items-item'
                  >
                    <AttributeButton
                      text={attribute.value}
                      active={
                        this.getCartItemDetails().activeAttribute ===
                        attribute.id
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {this.getCartItemDetails().color.length !== 0 && (
            <div className='cart-item-details-attribute'>
              <p className='cart-item-details-attribute-text'>
                {this.getCartItemDetails().color[0].name}:
              </p>
              <div className='cart-item-details-attribute-items'>
                {this.getCartItemDetails().color[0].items.map((color) => (
                  <div
                    key={color.id}
                    className='cart-item-details-attribute-items-item'
                  >
                    <ColorButton
                      color={color.value}
                      active={
                        this.getCartItemDetails().activeColor === color.id
                      }
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
          <p className='cart-item-buttons-text'>
            {this.getCartItemDetails().qty}
          </p>
          <CountButton
            text='-'
            onClick={() => this.props.removeQuantity(this.props.cartItem)}
          />
        </div>
        <div className='cart-item-Image'>
          <CartImageSlider gallery={this.getCartItemDetails().gallery} />
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
