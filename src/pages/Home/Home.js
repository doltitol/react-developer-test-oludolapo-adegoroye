import React, { PureComponent } from 'react';
import MainButton from '../../components/Buttons/MainButton';
import ProductItem from '../../components/ProductItem/ProductItem';
import './home.style.scss';
import { client } from '../../config/apolloClient';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { allResolvers } from '../../graphql/resolvers';

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pagination: 6,
      page: {},
    };
  }
  async getCategory() {
    const cat = this.props.category;
    return await client.query({
      query: allResolvers.CATEGORY,
      variables: {
        input: {
          title: cat,
        },
      },
      fetchPolicy: 'network-only',
    });
  }
  componentDidMount() {
    this.getCategory().then((result) => {
      this.setState((prevState) => {
        return {
          page: prevState.page === result ? prevState.page : result,
        };
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.getCategory().then((result) =>
        this.setState((prevState) => {
          return {
            page: prevState.page === result ? prevState.page : result,
          };
        })
      );
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
            <h1 className='home-heading'>
              {this.state.page?.data.category.name}
            </h1>
            <div className='home-product'>
              {this.state.page?.data.category.products
                .slice(0, this.state.pagination)
                .map((product) => (
                  <ProductItem productId={product.id} key={product.id} />
                ))}
            </div>
            <div className='home-loadbutton'>
              {this.state.page.data.category.products.length > 6 && (
                <MainButton
                  text='Load More'
                  width='200px'
                  height='53px'
                  onClick={() =>
                    this.handlePagination(
                      this.state.page.data.category.products.length
                    )
                  }
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
const mapStateToProps = (state) => {
  return {
    currency: state.cart.currency,
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
