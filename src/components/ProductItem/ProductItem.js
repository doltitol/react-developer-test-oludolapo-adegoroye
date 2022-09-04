import React, { PureComponent } from 'react';
import { Icons } from '../../assets/images/Icons';
import { numberCommaFormatter } from '../../util';
import './productitem.style.scss';
import { Link } from 'react-router-dom';
import { client } from '../../config/apolloClient';
import { allResolvers } from '../../graphql/resolvers';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

export class ProductItem extends PureComponent {
  state = {
    showAddToCart: false,
    product: {},
  };
  async getProduct() {
    const id = this.props.productId;
    return await client.query({
      query: allResolvers.PRODUCT,
      variables: {
        productId: id,
      },
      fetchPolicy: 'network-only',
    });
  }
  componentDidMount() {
    this.getProduct().then((result) => {
      this.setState((prevState) => {
        return {
          product: prevState.product === result ? prevState.product : result,
        };
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.getProduct().then((result) =>
        this.setState((prevState) => {
          return {
            product: prevState.product === result ? prevState.product : result,
          };
        })
      );
    }
  }
  render() {
    const activeAttribute = this.state.product?.data
      ? this.state.product?.data.product.attributes.filter(
          (attr) => attr.id === 'Size' || attr.id === 'Capacity'
        ).length !== 0
        ? this.state.product?.data.product.attributes.filter(
            (attr) => attr.id === 'Size' || attr.id === 'Capacity'
          )[0].items[0].id
        : ''
      : null;
    const activeColor = this.state.product?.data
      ? this.state.product?.data.product.attributes.filter(
          (attr) => attr.id === 'Color'
        ).length !== 0
        ? this.state.product?.data.product.attributes.filter(
            (attr) => attr.id === 'Color'
          )[0].items[0].id
        : ''
      : null;
    return (
      <>
        {this.state.product?.data && (
          <div
            className='product-item'
            onMouseOver={() => this.setState({ showAddToCart: true })}
            onMouseLeave={() => this.setState({ showAddToCart: false })}
          >
            <Link to={`/product/${this.state.product.data.product.id}`}>
              <div className='product-item-image'>
                <img
                  src={this.state.product.data.product.gallery[0]}
                  alt={this.state.product.data.product.name}
                  className='product-item-image-img'
                />
                {!this.state.product.data.product.inStock && (
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
                  !this.state.product.data.product.inStock
                    ? 'rgba(94, 206, 123, 0.8)'
                    : '#5ECE7B'
                }
                className='product-item-addtocart'
                onClick={() =>
                  this.state.product.data.product.inStock
                    ? this.props.addToCart(
                        this.state.product.data.product,
                        activeColor,
                        activeAttribute
                      )
                    : null
                }
              />
            )}
            <Link to={`/product/${this.state.product.data.product.id}`}>
              <p
                className='product-item-name'
                style={{
                  color: this.state.product.data.product.inStock
                    ? '#1D1F22'
                    : '#8D8F9A',
                }}
              >
                {this.state.product.data.product.brand} -{' '}
                {this.state.product.data.product.name}
              </p>
            </Link>
            {this.state.product.data.product.prices
              .filter((price) => price.currency.symbol === this.props.currency)
              .map((item) => (
                <p
                  className='product-item-price'
                  key={item.currency.symbol}
                  style={{
                    color: this.state.product.data.product.inStock
                      ? '#1D1F22'
                      : '#8D8F9A',
                  }}
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
