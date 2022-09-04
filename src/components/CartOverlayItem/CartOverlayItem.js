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
      <div className='cart-overlay-item'>
        <div className='cart-overlay-item-details'>
          <Link
            to={`/product/${this.props.cartItem.id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <p className='cart-overlay-item-details-text'>
              {this.props.cartItem.brand}
            </p>
          </Link>
          <Link
            to={`/product/${this.props.cartItem.id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <p className='cart-overlay-item-details-text'>
              {this.props.cartItem.name}
            </p>
          </Link>
          <p className='cart-overlay-item-details-price'>
            {pricing[0].currency.symbol} {numberCommaFormatter(pricing[0].amount)}
          </p>
          {size.length !== 0 && (
            <div className='cart-overlay-item-details-attribute'>
              <p className='cart-overlay-item-details-attribute-text'>
                {size[0].name}:
              </p>
              <div className='cart-overlay-item-details-attribute-items'>
                {size[0].items.map((attribute) => (
                  <div
                    key={attribute.id}
                    className='cart-overlay-item-details-attribute-items-item'
                  >
                    <AttributeButton
                      text={attribute.value}
                      active={
                        this.props.cartItem.activeAttribute === attribute.id
                      }
                      small
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {color.length !== 0 && (
            <div className='cart-overlay-item-details-attribute'>
              <p className='cart-overlay-item-details-attribute-text'>
                {color[0].name}:
              </p>
              <div className='cart-overlay-item-details-attribute-items'>
                {color[0].items.map((color) => (
                  <div
                    key={color.id}
                    className='cart-overlay-item-details-attribute-items-item'
                  >
                    <ColorButton
                      color={color.value}
                      active={this.props.cartItem.activeColor === color.id}
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
          <p>{this.props.cartItem.qty}</p>
          <CountButton
            small
            text='-'
            onClick={() => this.props.removeQuantity(this.props.cartItem)}
          />
        </div>
        <div className='cart-overlay-item-imageContainer'>
          <Link
            to={`/product/${this.props.cartItem.id}`}
            onClick={() => {
              this.props.closeCart();
            }}
          >
            <img
              src={this.props.cartItem.gallery[0]}
              alt={this.props.cartItem.name}
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
