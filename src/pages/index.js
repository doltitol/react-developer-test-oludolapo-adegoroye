import Home from './Home/Home';
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Product from './Product/Product';
import Cart from './Cart/Cart';
import { useGQLQuery } from '../graphql/useGQLQuery';

class Pages extends Component {
  constructor() {
    super();
    this.state = {
      categories: {},
    };
  }

  componentDidMount() {
    this.getCategories();
  }
  getCategories = () => {
    useGQLQuery.categories().then((result) =>
      this.setState({
        categories: result,
      })
    );
  };
  getCategoryName = () => {
    if (this.state.categories?.data) {
      const { categories } = this.state.categories?.data;
      return categories;
    }
  };

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
                <Navbar categories={this.getCategoryName()} />

                <Routes>
                  <Route
                    path='/'
                    element={
                      <Navigate to={`/${this.getCategoryName()[0].name}`} />
                    }
                  />
                  {this.state.categories !== {} &&
                    this.getCategoryName().map((route) => (
                      <Route
                        path={`/${route.name}`}
                        exact
                        element={<Home category={route.name} />}
                        key={route.name}
                      />
                    ))}

                  <Route path='/product/:id' exact element={<Product />} />
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
export default Pages;
