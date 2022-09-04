import Home from './Home/Home';
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Product from './Product/Product';
import { connect } from 'react-redux';
import Cart from './Cart/Cart';
import { allResolvers } from '../graphql/resolvers';
import { client } from '../config/apolloClient';

class Pages extends Component {
  constructor() {
    super();
    this.state = {
      categories: {},
    };
  }

  componentDidMount() {
    this.getCategories().then((result) =>
      this.setState({
        categories: result,
      })
    );
  }

  async getCategories() {
    return await client.query({
      query: allResolvers.ALL_CATEGORIES,
    });
  }

  render() {
    return (
      <div data-testid='pages'>
        {this.state.categories?.data && (
          <div>
            {this.state.categories?.loading ? (
              <div>Loading...</div>
            ) : this.state.categories?.error ? (
              <div>{this.state.categories.error}</div>
            ) : (
              <BrowserRouter>
                <Navbar categories={this.state.categories.data.categories} />

                <Routes>
                  <Route
                    path='/'
                    element={
                      <Navigate
                        to={`/${this.state.categories.data.categories[0].name}`}
                      />
                    }
                  />
                  {this.state.categories !== {} &&
                    this.state.categories?.data.categories.map((route) => (
                      <Route
                        path={`/${route.name}`}
                        exact
                        element={
                          <Home
                            category={route.name}
                            categories={this.state.categories.data.categories}
                          />
                        }
                        key={route.name}
                      />
                    ))}

                  <Route
                    path='/product/:id'
                    exact
                    element={
                      <Product
                        currency={this.props.currency}
                        addToCart={this.addToCart}
                      />
                    }
                  />
                  <Route path='/cart' exact element={<Cart />} />
                </Routes>
              </BrowserRouter>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.cart.currency,
    cartQuantity: state.cart.cartQuantity,
  };
};

export default connect(mapStateToProps)(Pages);
