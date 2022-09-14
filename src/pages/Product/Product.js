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
import { useGQLQuery } from '../../graphql/useGQLQuery';

function getParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
export class Product extends PureComponent {
  state = {
    thumbImg: '',
    activeAttribute: '',
    activeColor: '',
    product: {},
    showTooltip: false,
  };
  getProduct = () => {
    const { id } = this.props.params;
    useGQLQuery.productItem(id).then((result) => {
      this.setState((prevState) => {
        return {
          product: prevState.product === result ? prevState.product : result,
          thumbImg: '',
        };
      });
    });
  };
  checkProducts = () => {
    if (this.state.product?.data) {
      const product = this.state.product?.data?.product;
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
        gallery: product.gallery,
        brand: product.brand,
        attributes: product.attributes,
        name: product.name,
        price: product.prices,
      };
    }
  };
  handleAddToCart = () => {
    const inStock = this.checkProducts().product.inStock;
    const activeColor =
      this.state.activeColor === ''
        ? this.checkProducts().activeColor
        : this.state.activeColor;
    const activeAttribute =
      this.state.activeAttribute === ''
        ? this.checkProducts().activeAttribute
        : this.state.activeAttribute;
    if (
      inStock &&
      (this.state.activeColor !== '' || this.state.activeAttribute !== '')
    ) {
      return this.props.addToCart(
        this.checkProducts().product,
        activeColor,
        activeAttribute
      );
    } else {
      return null;
    }
  };
  handleTooltip = () => {
    if (this.state.activeAttribute === '' && this.state.activeColor === '') {
      this.setState({
        showTooltip: !this.state.showTooltip,
      });
    }
  };
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
  componentDidMount() {
    this.getProduct();
  }
  componentDidUpdate(prevProps) {
    if (this.props.params.id !== prevProps.params.id) {
      this.getProduct();
    }
  }
  render() {
    return (
      <div className='product' data-testid='product'>
        {this.state.product?.data && (
          <>
            <div className='product-imageContainer'>
              <div className='product-imageContainer-thumbnailContainer'>
                {this.checkProducts().gallery.map((image, index) => (
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
                      : this.checkProducts().gallery[0]
                  }
                  alt='productImage'
                  className='product-imageContainer-image-img'
                />
                {!this.checkProducts().product.inStock && (
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
                <h1>{this.checkProducts().brand}</h1>
                <h2>{this.checkProducts().name}</h2>
              </div>
              <div className='product-detailsContainer-attributes'>
                {this.checkProducts()
                  .attributes.filter(
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
                                this.state.activeAttribute === item.id
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

                {this.checkProducts()
                  .attributes.filter((attr) => attr.id === 'Color')
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
                                this.state.activeColor === item.id
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
                {this.checkProducts()
                  .price.filter(
                    (price) => price.currency.symbol === this.props.currency
                  )
                  .map((price) => (
                    <p key={price.currency.symbol}>
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
                  disabled={!this.state.product?.data?.product.inStock}
                  onClick={() => this.handleAddToCart()}
                  cursor={
                    this.state.activeAttribute === '' &&
                    this.state.activeColor === ''
                      ? 'not-allowed'
                      : 'pointer'
                  }
                  onMouseOver={() => this.handleTooltip()}
                  onMouseLeave={() => this.handleTooltip()}
                />
                {this.state.showTooltip && (
                  <span class='tooltiptext'>
                    Select an attribute to add item to the cart
                  </span>
                )}

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
