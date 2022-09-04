import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers/cartReducers';

const rootReducer = combineReducers({
  cart: cartReducer,
});
export const store = createStore(rootReducer);
