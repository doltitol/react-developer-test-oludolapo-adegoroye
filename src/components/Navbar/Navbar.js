import React, { PureComponent } from 'react';
import './navbar.styles.scss';
import Categories from '../../Categories.json';
import Currencies from '../../Currencies.json';
import { NavLink } from 'react-router-dom';
import { Icons } from '../../assets/images/Icons';
import CartOverlay from '../CartOverlay/CartOverlay';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';

export class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMobile: false,
      showCart: false,
    };
  }
closeCart = () => {
    this.setState({
      showCart: !this.state.showCart,
    });
  };
  render() {
    return (
      <div className='header'>
        <div className='header-navigation'>
          <ul className='header-navigation-link'>
            {Categories.data.categories.map((link) => (
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
                  {Categories.data.categories.map((link) => (
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
            onClick={this.props.handleShowCurrency}
          >
            <p className='header-actions-currency-text'>
              {this.props.currency}
            </p>
            <Icons.Dropdown
              size={6}
              color='#000000'
              style={{
                transform: this.props.showCurrency
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
              }}
            />
            {this.props.showCurrency && (
              <CurrencyDropdown
                currencies={Currencies.data.currencies}
                handleCurrency={this.props.handleCurrency}
              />
            )}
          </div>
          <div
            className='header-actions-cart'
            onClick={() => this.setState({ showCart: !this.state.showCart })}
          >
            <Icons.Cart size={22} color='#000000' />
            {this.state.showCart && (
              <CartOverlay
                closeCart={() => this.setState({ showCart: false })}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
