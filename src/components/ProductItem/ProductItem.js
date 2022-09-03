import React, { PureComponent } from 'react';
import { Icons } from '../../assets/images/Icons';
import { numberCommaFormatter } from '../../util';
import './productitem.style.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

export class ProductItem extends PureComponent {
  state = {
    showAddToCart: false,
  };
  render() {
    const activeSize =
      this.props.product.attributes.filter(
        (attr) => attr.id === 'Size' || attr.id === 'Capacity'
      ).length !== 0
        ? this.props.product.attributes.filter(
            (attr) => attr.id === 'Size' || attr.id === 'Capacity'
          )[0].items[0].id
        : '';
    const activeColor =
      this.props.product.attributes.filter((attr) => attr.id === 'Color')
        .length !== 0
        ? this.props.product.attributes.filter((attr) => attr.id === 'Color')[0]
            .items[0].id
        : '';
    return (
      <div
        className='product-item'
        onMouseOver={() => this.setState({ showAddToCart: true })}
        onMouseLeave={() => this.setState({ showAddToCart: false })}
      >
        <Link to={`/product/${this.props.product.id}`}>
          <div className='product-item-image'>
            <img
              src={this.props.product.gallery[0]}
              alt={this.props.product.name}
              className='product-item-image-img'
            />
            {!this.props.product.inStock && (
              <div className='product-item-image-screen'>
                <p className='product-item-image-screen-text'>out of stock</p>
              </div>
            )}
          </div>
        </Link>
        {this.state.showAddToCart && (
          <Icons.AddToCart
            size={80}
            color={
              !this.props.product.inStock
                ? 'rgba(94, 206, 123, 0.8)'
                : '#5ECE7B'
            }
            className='product-item-addtocart'
            onClick={() =>
              this.props.product.inStock
                ? this.props.addToCart(
                    this.props.product,
                    activeColor,
                    activeSize
                  )
                : null
            }
          />
        )}
        <Link to={`/product/${this.props.product.id}`}>
          <p
            className='product-item-name'
            style={{
              color: this.props.product.inStock ? '#1D1F22' : '#8D8F9A',
            }}
          >
            {this.props.product.brand} - {this.props.product.name}
          </p>
        </Link>
        {this.props.product.prices
          .filter((price) => price.currency.symbol === this.props.currency)
          .map((item) => (
            <p
              className='product-item-price'
              key={item.currency.symbol}
              style={{
                color: this.props.product.inStock ? '#1D1F22' : '#8D8F9A',
              }}
            >
              {item.currency.symbol} {numberCommaFormatter(item.amount)}
            </p>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
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
