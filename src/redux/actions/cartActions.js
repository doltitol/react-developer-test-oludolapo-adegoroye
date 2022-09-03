import {
  ADD_TO_CART,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
  CHANGE_CURRENCY,
} from '../types';

//add to cart
export const addToCart = (product, activeColor, activeAttribute) => {
  return {
    type: ADD_TO_CART,
    payload: {
      product: product,
      activeAttribute: activeAttribute,
      activeColor: activeColor,
    },
  };
};

//remove quantity action
export const removeQuantity = (product) => {
  return {
    type: REMOVE_QUANTITY,
    payload: {
      product: product,
    },
  };
};

//add quantity action
export const addQuantity = (product) => {
  return {
    type: ADD_QUANTITY,
    payload: {
      product: product,
    },
  };
};

//change currency
export const changeCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    payload: {
      currency: currency,
    },
  };
};
