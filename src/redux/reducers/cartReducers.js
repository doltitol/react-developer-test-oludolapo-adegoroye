import { initialState } from '../initialState';
import {
  ADD_QUANTITY,
  ADD_TO_CART,
  REMOVE_QUANTITY,
  CHANGE_CURRENCY,
} from '../types';

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency:
          state.currency === action.payload.currency
            ? state.currency
            : action.payload.currency.symbol,
        showCurrency: false,
        showCart: false,
      };
    case ADD_QUANTITY:
      const cartItemExist = state.cartItems.find(
        (item) =>
          item.id === action.payload.product.id &&
          item.activeColor === action.payload.product.activeColor &&
          item.activeAttribute === action.payload.product.activeAttribute
      );
      if (cartItemExist) {
        const newCartItems = state.cartItems.map((item) =>
          item.id === action.payload.product.id &&
          item.activeColor === action.payload.product.activeColor &&
          item.activeAttribute === action.payload.product.activeAttribute
            ? { ...cartItemExist, qty: cartItemExist.qty + 1 }
            : item
        );
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        return {
          ...state,
          cartItems: newCartItems,
          cartQuantity: newCartItems.reduce((acc, item) => acc + item.qty, 0),
        };
      } else {
        return state;
      }
    case REMOVE_QUANTITY:
      const cartItmExist = state.cartItems.find(
        (item) =>
          item.id === action.payload.product.id &&
          item.activeColor === action.payload.product.activeColor &&
          item.activeAttribute === action.payload.product.activeAttribute
      );
      if (cartItmExist.qty === 1) {
        const newCart = state.cartItems.filter(
          (item) => item.cartId !== action.payload.product.cartId
        );
        localStorage.setItem('cartItems', JSON.stringify(newCart));
        return {
          ...state,
          cartItems: newCart,
          cartQuantity: newCart.reduce((acc, item) => acc + item.qty, 0),
        };
      } else {
        const newCartItems = state.cartItems.map((item) =>
          item.id === action.payload.product.id &&
          item.activeColor === action.payload.product.activeColor &&
          item.activeAttribute === action.payload.product.activeAttribute
            ? { ...cartItmExist, qty: cartItmExist.qty - 1 }
            : item
        );
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        return {
          ...state,
          cartItems: newCartItems,
          cartQuantity: newCartItems.reduce((acc, item) => acc + item.qty, 0),
        };
      }
    case ADD_TO_CART:
      const productExist = state.cartItems.find(
        (item) =>
          item.id === action.payload.product.id &&
          item.activeColor === action.payload.activeColor &&
          item.activeAttribute === action.payload.activeAttribute
      );
      if (productExist) {
        const newCartItems = state.cartItems.map((item) =>
          item.id === action.payload.product.id &&
          item.activeColor === action.payload.activeColor &&
          item.activeAttribute === action.payload.activeAttribute
            ? { ...productExist, qty: productExist.qty + 1 }
            : item
        );
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        return {
          ...state,
          cartItems: newCartItems,
          cartQuantity: newCartItems.reduce((acc, item) => acc + item.qty, 0),
        };
      } else {
        const newCartItems = [
          ...state.cartItems,
          {
            ...action.payload.product,
            activeColor: action.payload.activeColor,
            activeAttribute: action.payload.activeAttribute,
            qty: 1,
            cartId: state.cartItems.length + 1,
          },
        ];
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        return {
          ...state,
          cartItems: newCartItems,
          cartQuantity: newCartItems.reduce((acc, item) => acc + item.qty, 0),
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
