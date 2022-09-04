export const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  cartQuantity: JSON.parse(localStorage.getItem('cartItems') || '[]').reduce(
    (acc, item) => acc + item.qty,
    0
  ),
  currency: '$',
};
