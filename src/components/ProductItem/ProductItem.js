import React, { PureComponent } from 'react';
import { Icons } from '../../assets/images/Icons';
import { numberCommaFormatter } from '../../util';
import './productitem.style.scss';
import { Link } from 'react-router-dom';

export class ProductItem extends PureComponent {
  state = {
    showAddToCart: false,
  };
  render() {
    return (
      <Link to={`/product/${this.props.product.id}`}>
        <div
          className='product-item'
          onMouseOver={() => this.setState({ showAddToCart: true })}
          onMouseLeave={() => this.setState({ showAddToCart: false })}
        >
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
          {this.state.showAddToCart && (
            <Icons.AddToCart
              size={80}
              color='#5ECE7B'
              className='product-item-addtocart'
              //onClick={() => {
              //  navigate();
              //}}
            />
          )}

          <p
            className='product-item-name'
            style={{
              color: this.props.product.inStock ? '#1D1F22' : '#8D8F9A',
            }}
          >
            {this.props.product.brand} - {this.props.product.name}
          </p>
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
      </Link>
    );
  }
}

export default ProductItem;
