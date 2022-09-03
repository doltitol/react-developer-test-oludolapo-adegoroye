import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import cartReducer from './redux/reducers/cartReducers';
import App from './App';

const rootReducer = combineReducers({
  cart: cartReducer,
});
const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
