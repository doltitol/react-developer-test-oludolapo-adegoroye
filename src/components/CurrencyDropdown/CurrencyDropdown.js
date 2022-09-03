import React, { PureComponent } from 'react';
import './currencyoverlay.style.scss';
import { connect } from 'react-redux';
import { changeCurrency } from '../../redux/actions/cartActions';

export class CurrencyDropdown extends PureComponent {
  handleCurrency = (currency) => {
    this.props.changeCurrency(currency);
  };
  render() {
    return (
      <div className='currency-dropdown'>
        <ul className='currency-dropdown-list'>
          {this.props.currencies.data.currencies.map((currency) => (
            <li
              key={currency.label}
              className='currency-dropdown-list-item'
              onClick={() => {
                this.handleCurrency(currency);
                this.props.closeCart();
              }}
            >
              <span>{currency.symbol}</span>
              <span>{currency.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currencies: state.cart.currencies,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currency) => {
      dispatch(changeCurrency(currency));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown);
