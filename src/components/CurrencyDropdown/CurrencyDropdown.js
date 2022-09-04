import React, { PureComponent } from 'react';
import './currencyoverlay.style.scss';
import { connect } from 'react-redux';
import { changeCurrency } from '../../redux/actions/cartActions';
import { client } from '../../config/apolloClient';
import { allResolvers } from '../../graphql/resolvers';

export class CurrencyDropdown extends PureComponent {
  state = {
    currencies: {},
  };
  async getCurrencies() {
    return await client.query({
      query: allResolvers.CURRENCIES,
    });
  }
  handleCurrency = (currency) => {
    this.props.handleCurrency(currency);
  };
  componentDidMount() {
    this.getCurrencies().then((result) =>
      this.setState({
        currencies: result,
      })
    );
  }
  render() {
    return (
      <>
        {this.state.currencies?.data && (
          <div className='currency-dropdown'>
            <ul className='currency-dropdown-list' data-testid='currency'>
              {this.state.currencies?.data.currencies.map((currency) => (
                <li
                  key={currency.label}
                  className='currency-dropdown-list-item'
                  onClick={() => {
                    this.props.changeCurrency(currency.symbol);
                    this.props.closeCart();
                  }}
                >
                  <span>{currency.symbol}</span>
                  <span>{currency.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.cart.currency,
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
