import React, { PureComponent } from 'react';
import './product.style.scss';
import { useParams } from 'react-router-dom';
import AttributeButton from '../../components/Buttons/AttributeButton';
import ColorButton from '../../components/Buttons/ColorButton';
import { numberCommaFormatter } from '../../util';
import MainButton from '../../components/Buttons/MainButton';
import { Interweave } from 'interweave';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { client } from '../../config/apolloClient';
import { allResolvers } from '../../graphql/resolvers';

function getParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
export class Product extends PureComponent {
  state = {
    thumbImg: '',
    activeAttribute: '',
    activeColor: '',
    product: {},
  };
  async getProduct() {
    const { id } = this.props.params;
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
    if (this.props.params.id !== prevProps.params.id) {
      this.getProduct().then((result) =>
        this.setState((prevState) => {
          return {
            product: prevState.product === result ? prevState.product : result,
          };
        })
      );
    }
  }
  changeImg = (img) => {
    this.setState((prevState) => {
      return {
        thumbImg: prevState.thumbImg === img ? prevState.thumbImg : img,
      };
    });
  };
  pickAttribute = (attr) => {
    this.setState((prevState) => {
      return {
        activeAttribute:
          prevState.activeAttribute === attr ? prevState.activeAttribute : attr,
      };
    });
  };
  pickColor = (attr) => {
    this.setState((prevState) => {
      return {
        activeColor:
          prevState.activeColor === attr ? prevState.activeColor : attr,
      };
    });
  };
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
      <div className='product'>
        {this.state.product?.data && (
          <>
            <div className='product-imageContainer'>
              <div className='product-imageContainer-thumbnailContainer'>
                {this.state.product.data.product.gallery.map((image, index) => (
                  <div
                    className='product-imageContainer-thumbnailContainer-thumb'
                    key={index}
                    onClick={() => this.changeImg(image)}
                  >
                    <img
                      src={image}
                      alt='productImage'
                      className='product-imageContainer-thumbnailContainer-thumb-img'
                    />
                  </div>
                ))}
              </div>
              <div className='product-imageContainer-image'>
                <img
                  src={
                    this.state.thumbImg !== ''
                      ? this.state.thumbImg
                      : this.state.product.data.product.gallery[0]
                  }
                  alt='productImage'
                  className='product-imageContainer-image-img'
                />
                {!this.state.product.data.product.inStock && (
                  <div className='product-imageContainer-image-screen'>
                    <p className='product-imageContainer-image-screen-text'>
                      out of stock
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className='product-detailsContainer'>
              <div className='product-detailsContainer-heading'>
                <h1>{this.state.product.data.product.brand}</h1>
                <h2>{this.state.product.data.product.name}</h2>
              </div>
              <div className='product-detailsContainer-attributes'>
                {this.state.product.data.product.attributes
                  .filter(
                    (attr) => attr.id === 'Size' || attr.id === 'Capacity'
                  )
                  .map((attribute) => (
                    <div
                      className='product-detailsContainer-attributes-size'
                      key={attribute.id}
                    >
                      <h3>{attribute.name}:</h3>
                      <div className='product-detailsContainer-attributes-size-itemlist'>
                        {attribute.items.map((item, index) => (
                          <div
                            key={item.id}
                            className='product-detailsContainer-attributes-size-itemlist-item'
                          >
                            <AttributeButton
                              text={item.value}
                              active={
                                this.state.activeAttribute === '' && index === 0
                                  ? true
                                  : this.state.activeAttribute === item.id
                                  ? true
                                  : false
                              }
                              onClick={() => this.pickAttribute(item.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                {this.state.product.data.product.attributes
                  .filter((attr) => attr.id === 'Color')
                  .map((attribute) => (
                    <div
                      className='product-detailsContainer-attributes-color'
                      key={attribute.id}
                    >
                      <h3>{attribute.name}:</h3>
                      <div className='product-detailsContainer-attributes-color-itemlist'>
                        {attribute.items.map((item, index) => (
                          <div
                            key={item.id}
                            className='product-detailsContainer-attributes-color-itemlist-item'
                          >
                            <ColorButton
                              color={item.value}
                              active={
                                this.state.activeColor === '' && index === 0
                                  ? true
                                  : this.state.activeColor === item.id
                                  ? true
                                  : false
                              }
                              onClick={() => this.pickColor(item.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              <div className='product-detailsContainer-pricing'>
                <h3>Price:</h3>
                {this.state.product.data.product.prices
                  .filter(
                    (price) => price.currency.symbol === this.props.currency
                  )
                  .map((price) => (
                    <p key={price.currency.label}>
                      {price.currency.symbol}{' '}
                      {numberCommaFormatter(price.amount)}
                    </p>
                  ))}
              </div>
              <div className='product-detailsContainer-footer'>
                <MainButton
                  text='add to cart'
                  width='292px'
                  height='52px'
                  disabled={!this.state.product.data.product.inStock}
                  onClick={() =>
                    this.state.product.data.product.inStock
                      ? this.props.addToCart(
                          this.state.product.data.product,
                          this.state.activeColor === ''
                            ? activeColor
                            : this.state.activeColor,
                          this.state.activeAttribute === ''
                            ? activeAttribute
                            : this.state.activeAttribute
                        )
                      : null
                  }
                />
                <div className='product-detailsContainer-footer-desc'>
                  <Interweave
                    content={this.state.product.data.product.description}
                  />
                </div>
              </div>
            </div>
          </>
        )}
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
    addToCart: (product, activeColor, activeAttribute) => {
      dispatch(addToCart(product, activeColor, activeAttribute));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(getParams(Product));
