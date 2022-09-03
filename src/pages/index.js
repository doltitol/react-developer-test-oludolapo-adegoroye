import Home from './Home/Home';
import { PureComponent } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import Categories from '../Categories.json';
//import Currencies from '../Currencies.json';
import Navbar from '../components/Navbar/Navbar';
import Product from './Product/Product';
import { connect } from 'react-redux';
import Cart from './Cart/Cart';

class Pages extends PureComponent {
 
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={
                <Navigate to={`/${this.props.products.data.categories[0].name}`} />
              }
            />
            {this.props.products.data.categories.map((route) => (
              <Route
                path={`/${route.name}`}
                exact
                element={
                  <Home
                    category={route.name}
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
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
    return {
      products: state.cart.products,
      currency: state.cart.currency,
      currencies: state.cart.currencies,
      cartQuantity: state.cart.cartQuantity
    }
  }

export default connect(mapStateToProps)(Pages);
