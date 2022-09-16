import React, {PureComponent} from 'react';
import {Icons} from '../../assets/images/Icons';
import {numberCommaFormatter} from '../../util';
import './productitem.style.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions/cartActions';

export class ProductItem extends PureComponent {
  state = {
    showAddToCart: false,
  };
  checkProducts = () => {
    const product = this.props.product;
    const attributeSize = product.attributes.filter(
      (attr) => attr.id !== 'Color'
    );
    const attributeColor = product.attributes.filter(
      (attr) => attr.id === 'Color'
    );
    const newColor =
      attributeColor.length > 0 ? attributeColor[0].items[0].id : '';
    const newSize =
      attributeSize.length > 0 ? attributeSize[0].items[0].id : '';
    return {
      activeSize: newSize,
      activeColor: newColor,
      product,
    };
  };
  checkInstock = () => {
    const inStock = this.checkProducts().product.inStock;
    if (inStock) {
      return '#1D1F22';
    } else {
      return '#8D8F9A';
    }
  };
  handleAddToCart = () => {
    const inStock = this.checkProducts().product.inStock;
    if (inStock) {
      return this.props.addToCart(
        this.checkProducts().product,
        this.checkProducts().activeColor,
        this.checkProducts().activeSize
      );
    } else {
      return null;
    }
  };
  render() {
    return (
      <>
        {this.props.product && (
          <div
            className='product-item'
            onMouseOver={() => this.setState({showAddToCart: true})}
            onMouseLeave={() => this.setState({showAddToCart: false})}
          >
            <Link
              to={`/product/${this.checkProducts().product.id}`}
              state={{
                id: this.checkProducts().product.id,
                activeColor: this.checkProducts().activeColor,
                activeSize: this.checkProducts().activeSize,
              }}
            >
              <div className='product-item-image'>
                <img
                  src={this.checkProducts().product.gallery[0]}
                  alt={this.checkProducts().product.name}
                  className='product-item-image-img'
                />
                {!this.checkProducts().product.inStock && (
                  <div className='product-item-image-screen'>
                    <p className='product-item-image-screen-text'>
                      out of stock
                    </p>
                  </div>
                )}
              </div>
            </Link>
            {this.state.showAddToCart && (
              <Icons.AddToCart
                size={80}
                color={
                  !this.checkProducts().product.inStock
                    ? 'rgba(94, 206, 123, 0.8)'
                    : '#5ECE7B'
                }
                style={{
                  cursor: !this.checkProducts().product.inStock
                    ? 'not-allowed'
                    : 'pointer',
                }}
                className='product-item-addtocart'
                onClick={() => this.handleAddToCart()}
              />
            )}
            <Link
              to={`/product/${this.checkProducts().product.id}`}
              state={{
                id: this.checkProducts().product.id,
                activeColor: this.checkProducts().activeColor,
                activeSize: this.checkProducts().activeSize,
              }}
            >
              <p
                className='product-item-name'
                style={{color: this.checkInstock()}}
              >
                {this.checkProducts().product.brand} -{' '}
                {this.checkProducts().product.name}
              </p>
            </Link>
            {this.checkProducts()
              .product.prices.filter(
                (price) => price.currency.symbol === this.props.currency
              )
              .map((item) => (
                <p
                  className='product-item-price'
                  key={item.currency.symbol}
                  style={{color: this.checkInstock()}}
                >
                  {item.currency.symbol} {numberCommaFormatter(item.amount)}
                </p>
              ))}
          </div>
        )}
      </>
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
    addToCart: (product, activeColor, activeAttribute) => {
      dispatch(addToCart(product, activeColor, activeAttribute));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
