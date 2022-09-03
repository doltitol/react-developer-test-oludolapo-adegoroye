import React, { PureComponent } from 'react';
import MainButton from '../../components/Buttons/MainButton';
import ProductItem from '../../components/ProductItem/ProductItem';
import './home.style.scss';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pagination: 6,
    };
  }
  handlePagination = () => {
    this.setState((prevState) => {
      const product = this.props.products.data.categories.filter(
        (category) => category.name === this.props.category
      );
      const products = product[0].products;
      return {
        pagination:
          prevState.pagination < products.length
            ? prevState.pagination + 6
            : this.state.pagination,
      };
    });
  };
  addToCart = (product, activeAttribute, activeColor) => {
    //this.props.addToCart(product, activeAttribute, activeColor);
  };
  render() {
    const product = this.props.products.data.categories.filter(
      (category) => category.name === this.props.category
    );
    const products = product[0].products;
    return (
      <div className='home'>
        <h1 className='home-heading'>{this.props.category}</h1>
        <div className='home-product'>
          {products.slice(0, this.state.pagination).map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
        <div className='home-loadbutton'>
          {products.length > 6 && (
            <MainButton
              text='Load More'
              width='200px'
              height='53px'
              onClick={() => this.handlePagination()}
              disabled={false}
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    currency: state.cart.currency,
    currencies: state.cart.currencies,
    cartQuantity: state.cart.cartQuantity,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, activeAttribute, activeColor) => {
      dispatch(addToCart(product, activeAttribute, activeColor));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
