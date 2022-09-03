import Categories from '../Categories.json';
import Currencies from '../Currencies.json';

export const initialState = {
  products: Categories,
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  cartQuantity: JSON.parse(localStorage.getItem('cartItems') || '[]').reduce(
    (acc, item) => acc + item.qty,
    0
  ),
  currencies: Currencies,
  currency: '$',
};
