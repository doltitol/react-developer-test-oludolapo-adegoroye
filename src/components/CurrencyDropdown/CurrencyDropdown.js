import React, { PureComponent } from 'react';
import './currencyoverlay.style.scss';
import { connect } from 'react-redux';
import { changeCurrency } from '../../redux/actions/cartActions';
import { useGQLQuery } from '../../graphql/useGQLQuery';

export class CurrencyDropdown extends PureComponent {
  state = {
    currencies: {},
  };

  handleCurrency = (currency) => {
    this.props.handleCurrency(currency);
  };
  getCurrencies = () => {
    useGQLQuery.currencies().then((result) =>
      this.setState({
        currencies: result,
      })
    );
  };
  getCurrencyDetails = () => {
    const currencies = this.state.currencies?.data.currencies;
    return { currencies };
  };
  componentDidMount() {
    this.getCurrencies();
  }
  render() {
    return (
      <>
        {this.state.currencies?.data && (
          <div className='currency-dropdown'>
            <ul className='currency-dropdown-list' data-testid='currency'>
              {this.getCurrencyDetails().currencies.map((currency) => (
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
