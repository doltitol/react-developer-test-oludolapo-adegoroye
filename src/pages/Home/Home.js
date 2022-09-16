import React, { PureComponent } from 'react';
import MainButton from '../../components/Buttons/MainButton';
import ProductItem from '../../components/ProductItem/ProductItem';
import './home.style.scss';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { useGQLQuery } from '../../graphql/useGQLQuery';

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pagination: 6,
      page: {},
    };
  }

  getCategory = () => {
    const category = this.props.category;
    useGQLQuery.category(category).then((result) => {
      this.setState( {
      page: result,
      });
    });
  };

  getProducts = () => {
    if (this.state.page?.data) {
      const { products } = this.state.page?.data.category;
      return products;
    }
  };
  componentDidMount() {
    this.getCategory();
  }
  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.getCategory();
    }
  }

  handlePagination = (catLen) => {
    this.setState((prevState) => {
      return {
        pagination:
          prevState.pagination < catLen
            ? prevState.pagination + 6
            : this.state.pagination,
      };
    });
  };

  render() {
  return (
    <>
      {this.state.page?.data && (
        <div className='home'>
          <h1 className='home-heading'>{this.props.category}</h1>
          <div className='home-product'>
            {this.getProducts()
              .slice(0, this.state.pagination)
              .map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
          </div>
          <div className='home-loadbutton'>
            {this.getProducts().length > 6 && (
              <MainButton
                text='Load More'
                width='200px'
                height='53px'
                onClick={() => this.handlePagination(this.getProducts().length)}
                disabled={false}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, activeAttribute, activeColor) => {
      dispatch(addToCart(product, activeAttribute, activeColor));
    },
  };
};
export default connect(mapDispatchToProps)(Home);
