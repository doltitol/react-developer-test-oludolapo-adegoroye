import React, { PureComponent } from 'react';
import './product.style.scss';
import { useParams } from 'react-router-dom';
import Categories from '../../Categories.json';
import AttributeButton from '../../components/Buttons/AttributeButton';
import ColorButton from '../../components/Buttons/ColorButton';
import { numberCommaFormatter } from '../../util';
import MainButton from '../../components/Buttons/MainButton';
import { Interweave } from 'interweave';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

function getParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
export class Product extends PureComponent {
  state = {
    thumbImg: '',
    activeAttribute: '',
    activeColor: '',
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
  render() {
    const { id } = this.props.params;
    const category = Categories.data.categories.filter(
      (category) => category.name === 'all'
    );
    const product = category[0].products.filter((product) => product.id === id);
    const pricing = product[0].prices.filter(
      (price) => price.currency.symbol === this.props.currency
    );
    return (
      <div className='product'>
        <div className='product-imageContainer'>
          <div className='product-imageContainer-thumbnailContainer'>
            {product[0].gallery.map((image, index) => (
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
                  : product[0].gallery[0]
              }
              alt='productImage'
              className='product-imageContainer-image-img'
            />
            {!product[0].inStock && (
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
            <h1>{product[0].brand}</h1>
            <h2>{product[0].name}</h2>
          </div>
          <div className='product-detailsContainer-attributes'>
            {product[0].attributes
              .filter((attr) => attr.id === 'Size' || attr.id === 'Capacity')
              .map((attribute) => (
                <div
                  className='product-detailsContainer-attributes-size'
                  key={attribute.id}
                >
                  <h3>{attribute.name}:</h3>
                  <div className='product-detailsContainer-attributes-size-itemlist'>
                    {attribute.items.map((item) => (
                      <div
                        key={item.id}
                        className='product-detailsContainer-attributes-size-itemlist-item'
                      >
                        <AttributeButton
                          text={item.value}
                          active={this.state.activeAttribute === item.id}
                          onClick={() => this.pickAttribute(item.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {product[0].attributes
              .filter((attr) => attr.id === 'Color')
              .map((attribute) => (
                <div
                  className='product-detailsContainer-attributes-color'
                  key={attribute.id}
                >
                  <h3>{attribute.name}:</h3>
                  <div className='product-detailsContainer-attributes-color-itemlist'>
                    {attribute.items.map((item) => (
                      <div
                        key={item.id}
                        className='product-detailsContainer-attributes-color-itemlist-item'
                      >
                        <ColorButton
                          color={item.value}
                          active={
                            this.state.activeColor === item.id ? true : false
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
            <p>
              {pricing[0].currency.symbol}{' '}
              {numberCommaFormatter(pricing[0].amount)}
            </p>
          </div>
          <div className='product-detailsContainer-footer'>
            <MainButton
              text='add to cart'
              width='292px'
              height='52px'
              disabled={!product[0].inStock}
              onClick={() =>
                product[0].inStock
                  ? this.props.addToCart(
                      product[0],
                      this.state.activeColor,
                      this.state.activeAttribute
                    )
                  : null
              }
            />
            <div className='product-detailsContainer-footer-desc'>
              <Interweave content={product[0].description} />
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(getParams(Product));
