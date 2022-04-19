/* eslint-disable no-param-reassign */

const FETCH_CATEGORIES = 'store/listingPage/FETCH_CATEGORIES';
const FETCH_CURRENCY = 'store/listingPage/FETCH_CURRENCY';
const CURRENCY_SWITCHER = 'store/listingPage/CURRENCY_SWITCHER';

const initialState = {
  categories: [],
  currencyDetails: [],
  cartOverlay: false,
};

const fetchCategories = (categories) => ({
  type: FETCH_CATEGORIES,
  payload: categories,
});

const fetchCurrency = (currencies) => ({
  type: FETCH_CURRENCY,
  payload: currencies,
});

export const toggleCurrency = (value) => ({
  type: CURRENCY_SWITCHER,
  payload: value,
});

export const getCategories = () => async (dispatch) => {
  const categoryQuery = `{
    categories {
      name
    }
    
  }`;
  const products = await fetch('http://localhost:4000', {
    method: 'POST',
    body: JSON.stringify({ query: categoryQuery }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const response = await products.json();
  dispatch(fetchCategories(response.data));
};

export const getCurrency = () => async (dispatch) => {
  const currencyQuery = `{
    currencies {
      label
      symbol
    }
  }`;

  const products = await fetch('http://localhost:4000', {
    method: 'POST',
    body: JSON.stringify({ query: currencyQuery }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const response = await products.json();
  dispatch(fetchCurrency(response.data));
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload.categories],
      };
    case FETCH_CURRENCY:
      return {
        ...state,
        currencyDetails: action.payload.currencies.map((currency) => ({
          ...currency,
          selected: false,
        })),
      };
    case CURRENCY_SWITCHER:
      return {
        ...state,
        currencyDetails: state.currencyDetails.map((currency) => {
          if (currency.symbol === action.payload) {
            currency.selected = true;
          } else {
            currency.selected = false;
          }
          return currency;
        }),
      };
    default:
      return state;
  }
};

export default categoryReducer;

/* eslint-enable no-param-reassign */
