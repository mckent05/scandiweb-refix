const FETCH_PRODUCTS = "store/listingPage/FETCH_PRODUCTS";
const UPDATE_LOADINGSTATE = "store/listingPage/UPDATE_LOADINGSTATE";
const CURRENCY_SWITCHER = "store/listingPage/CURRENCY_SWITCHER";

const initialState = {
  allProducts: {},
  isLoading: true,
};

const fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  payload: products,
});

const setLoadingState = (payload) => ({
  type: UPDATE_LOADINGSTATE,
  payload,
});

export const toggleCurrency = (value) => ({
  type: CURRENCY_SWITCHER,
  payload: value,
});

export const getProducts = (product) => async (dispatch) => {
  const productQuery = `{
    category(input: {title: "${product}"}) {
      name
      products {
        id
        inStock
        name
        gallery
        attributes {
          id
            name
            items {
              displayValue
              value
              id
            }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }`;
  const products = await fetch("http://localhost:4000", {
    method: "POST",
    body: JSON.stringify({ query: productQuery }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const response = await products.json();
  dispatch(fetchProducts(response.data.category));
  dispatch(setLoadingState(false));
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADINGSTATE:
      return {
        ...state,
        isLoading: action.payload,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        allProducts: {
          name: action.payload.name,
          products: action.payload.products.map((product) => ({
            ...product,
            prices: product.prices.map((price) => ({
              ...price,
              selected: false,
            })),
            attributes: product.attributes.map((attr) => ({
              ...attr,
              items: attr.items.map((item) => ({
                ...item,
                selected: false,
              })),
            })),
          })),
        },
      };
    case CURRENCY_SWITCHER:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          products: state.allProducts.products.map((product) => {
            product.prices.forEach((price) => {
              if (price.currency.symbol === action.payload) {
                price.selected = true;
              } else {
                price.selected = false;
              }
              return price;
            });
            return product;
          }),
        },
      };
    default:
      return state;
  }
};

export default productListReducer;
