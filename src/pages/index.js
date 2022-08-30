import Home from './Home/Home';
import { PureComponent } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Categories from '../Categories.json';
import Currencies from '../Currencies.json';
import Navbar from '../components/Navbar/Navbar';
import Product from './Product/Product';

class Pages extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currency: Currencies.data.currencies[0].symbol,
      showCurrency: false,
    };
  }
  handleCurrency = (currency) => {
    this.setState((prevState) => {
      return {
        currency:
          prevState.currency === currency.symbol
            ? prevState.currency
            : currency.symbol,
        showCurrency: false,
      };
    });
  };
  handleShowCurrency = () => {
    this.setState({
      showCurrency: !this.state.showCurrency,
      showCart: false,
    });
  };
  render() {
    console.log(Categories.data.categories);
    return (
      <div>
        <BrowserRouter>
          <Navbar
            currency={this.state.currency}
            showCurrency={this.state.showCurrency}
            handleShowCurrency={() => this.handleShowCurrency()}
            showMobile={this.state.showMobile}
            showCart={this.state.showCart}
            closeCart={() => this.closeCart()}
            handleCurrency={this.handleCurrency}
            handleShowCart={() => this.handleShowCart()}
          />
          <Routes>
            <Route
              path='/'
              element={
                <Navigate to={`/${Categories.data.categories[0].name}`} />
              }
            />
            {Categories.data.categories.map((route) => (
              <Route
                path={`/${route.name}`}
                exact
                element={
                  <Home
                    category={route.name}
                    categories={Categories.data.categories}
                    currency={this.state.currency}
                  />
                }
                key={route.name}
              />
            ))}
            <Route
              path='/product/:id'
              exact
              element={<Product currency={this.state.currency} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default Pages;
