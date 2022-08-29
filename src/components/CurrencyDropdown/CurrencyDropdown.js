import React, { PureComponent } from 'react';
import './currencyoverlay.style.scss';

export class CurrencyDropdown extends PureComponent {
  render() {
    return (
      <div className='currency-dropdown'>
        <ul className='currency-dropdown-list'>
          {this.props.currencies.map((currency) => (
            <li
              key={currency.label}
              className='currency-dropdown-list-item'
              onClick={() => this.props.handleCurrency(currency)}
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

export default CurrencyDropdown;
