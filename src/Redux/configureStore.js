import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import productListReducer from './PLP/listingPage';
import categoryReducer from './PLP/header';
import productDescriptionReducer from "./PDP/descriptionPage";

const reducer = combineReducers({
  productList: productListReducer,
  category: categoryReducer,
  productDescription: productDescriptionReducer

});

const store = createStore(
  reducer,
  applyMiddleware(logger, thunk),
);

export default store;
