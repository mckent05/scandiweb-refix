import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import productListReducer from './PLP/listingPage';
import categoryReducer from './PLP/header';

const reducer = combineReducers({
  productList: productListReducer,
  category: categoryReducer,

});

const store = createStore(
  reducer,
  applyMiddleware(logger, thunk),
);

export default store;
