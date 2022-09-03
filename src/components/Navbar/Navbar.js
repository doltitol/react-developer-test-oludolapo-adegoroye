import React, { PureComponent } from 'react';
import './navbar.styles.scss';
import { NavLink } from 'react-router-dom';
import { Icons } from '../../assets/images/Icons';
import CartOverlay from '../CartOverlay/CartOverlay';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';
import { connect } from 'react-redux';

export class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMobile: false,
      showCart: false,
      showCurrency: false,
    };
  }
  handleShowCart = () => {
    this.setState({ showCart: !this.state.showCart });
  };
  handleShowCurrency = () => {
    this.setState({ showCurrency: !this.state.showCurrency });
  };
  closeCart = () => {
    this.setState({
      showCart: this.state.showCart ? false : false,
    });
  };

  render() {
    return (
      <div className='header'>
        <div className='header-navigation'>
          <ul className='header-navigation-link'>
            {this.props.products.data.categories.map((link) => (
              <li className='header-navigation-link-item' key={link.name}>
                <NavLink
                  to={`/${link.name}`}
                  className={({ isActive }) =>
                    isActive ? 'link-active' : 'link'
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className='header-navigation-mobile'>
            <div className='header-navigation-mobile-icon'>
              <Icons.Menu
                color='#5ECE7B'
                size={30}
                onClick={() => this.setState({ showMobile: true })}
              />
            </div>
            {this.state.showMobile && (
              <div className='header-navigation-mobile-dropdown slide-down'>
                <Icons.Close
                  color='#5ECE7B'
                  size={23}
                  className='header-navigation-mobile-dropdown-close'
                  onClick={() => this.setState({ showMobile: false })}
                />
                <ul className='header-navigation-mobile-dropdown-link'>
                  {this.props.products.data.categories.map((link) => (
                    <li
                      className='header-navigation-mobile-dropdown-link-item'
                      key={link.name}
                      onClick={() => this.setState({ showMobile: false })}
                    >
                      <NavLink
                        to={`/${link.name}`}
                        className={({ isActive }) =>
                          isActive ? 'link-active' : 'link'
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className='header-logo'>
          <NavLink to='/'>
            <Icons.Logo size={40} />
          </NavLink>
        </div>
        <div className='header-actions'>
          <div
            className='header-actions-currency'
            onClick={() => this.handleShowCurrency()}
          >
            <p className='header-actions-currency-text'>
              {this.props.currency}
            </p>
            <Icons.Dropdown
              size={6}
              color='#000000'
              style={{
                transform: this.state.showCurrency
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
              }}
            />
            {this.state.showCurrency && (
              <CurrencyDropdown closeCart={() => this.closeCart()} />
            )}
          </div>
          <div
            className='header-actions-cart'
            onClick={() => this.handleShowCart()}
          >
            <Icons.Cart size={30} color='#000000' />
            {this.props.cartQuantity > 0 && (
              <div className='header-actions-cart-badge'>
                <p>{this.props.cartQuantity}</p>
              </div>
            )}
          </div>
          {this.state.showCart && (
            <CartOverlay closeCart={() => this.handleShowCart()} />
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
    showCart: state.cart.showCart,
    showCurrency: state.cart.showCurrency,
  };
};

export default connect(mapStateToProps)(Navbar);
