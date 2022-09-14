import React, { PureComponent } from 'react';
import AttributeButton from '../Buttons/AttributeButton';
import ColorButton from '../Buttons/ColorButton';
import CountButton from '../Buttons/CountButton';
import './cartoverlayitem.style.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { numberCommaFormatter } from '../../util';
import { addQuantity, removeQuantity } from '../../redux/actions/cartActions';

export class CartOverlayItem extends PureComponent {
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
      <div className='cart-overlay-item' data-testid='cart-overlay-item'>
        <div className='cart-overlay-item-details'>
          <Link
            to={`/product/${this.getCartItemDetails().id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <p className='cart-overlay-item-details-text'>
              {this.getCartItemDetails().brand}
            </p>
          </Link>
          <Link
            to={`/product/${this.getCartItemDetails().id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <p className='cart-overlay-item-details-text'>
              {this.getCartItemDetails().name}
            </p>
          </Link>
          <p className='cart-overlay-item-details-price'>
            {this.getCartItemDetails().pricing[0].currency.symbol}{' '}
            {numberCommaFormatter(this.getCartItemDetails().pricing[0].amount)}
          </p>
          {this.getCartItemDetails().size.length !== 0 && (
            <div className='cart-overlay-item-details-attribute'>
              <p className='cart-overlay-item-details-attribute-text'>
                {this.getCartItemDetails().size[0].name}:
              </p>
              <div className='cart-overlay-item-details-attribute-items'>
                {this.getCartItemDetails().size[0].items.map((attribute) => (
                  <div
                    key={attribute.id}
                    className='cart-overlay-item-details-attribute-items-item'
                  >
                    <AttributeButton
                      text={attribute.value}
                      active={
                        this.getCartItemDetails().activeAttribute ===
                        attribute.id
                      }
                      small
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {this.getCartItemDetails().color.length !== 0 && (
            <div className='cart-overlay-item-details-attribute'>
              <p className='cart-overlay-item-details-attribute-text'>
                {this.getCartItemDetails().color[0].name}:
              </p>
              <div className='cart-overlay-item-details-attribute-items'>
                {this.getCartItemDetails().color[0].items.map((color) => (
                  <div
                    key={color.id}
                    className='cart-overlay-item-details-attribute-items-item'
                  >
                    <ColorButton
                      color={color.value}
                      active={
                        this.getCartItemDetails().activeColor === color.id
                      }
                      small
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='cart-overlay-item-count'>
          <CountButton
            small
            text='+'
            onClick={() => this.props.addQuantity(this.props.cartItem)}
          />
          <p>{this.getCartItemDetails().qty}</p>
          <CountButton
            small
            text='-'
            onClick={() => this.props.removeQuantity(this.props.cartItem)}
          />
        </div>
        <div className='cart-overlay-item-imageContainer'>
          <Link
            to={`/product/${this.getCartItemDetails().id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <img
              src={this.getCartItemDetails().gallery[0]}
              alt={this.getCartItemDetails().name}
              className='cart-overlay-item-imageContainer-img'
            />
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.cart.currency,
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

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayItem);
