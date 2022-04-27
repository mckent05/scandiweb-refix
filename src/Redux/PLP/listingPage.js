/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */

const FETCH_PRODUCTS = 'store/listingPage/FETCH_PRODUCTS';
const UPDATE_LOADINGSTATE = 'store/listingPage/UPDATE_LOADINGSTATE';
const ATTR_POPUP_TOGGLE = 'store/listingPage/ATTR_POPUP_TOGGLE';
const CLOSE_POPUP = 'store/listingPage/CLOSE_POPUP';
const SELECT_ATTRIBUTE = 'store/listingPage/SELECT_ATTRIBUTE';
const ADD_TO_CART = 'store/listingPage/ADD_TO_CART';
const REMOVE_FROM_CART = 'store/listingPage/REMOVE_FROM_CART';
const INCREASE_QUANTITY = 'store/listingPage/INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'store/listingPage/DECREASE_QUANTITY';
const CART_IMAGE_CONTROL = 'store/listingPage/CART_IMAGE_CONTROL';
const FETCH_PRODUCT_ATTRIBUTES = 'store/listingPage/FETCH_PRODUCT_ATTRIBUTES';

export const initialState = {
  allProducts: {},
  isLoading: true,
  productAttr: [],
  attrPopup: false,
  shoppingCart: [],
};

const fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  payload: products,
});

const setLoadingState = (payload) => ({
  type: UPDATE_LOADINGSTATE,
  payload,
});

export const togglePopUp = (productName) => ({
  type: ATTR_POPUP_TOGGLE,
  payload: productName,
});

export const closePopup = (payload) => ({
  type: CLOSE_POPUP,
  payload,
});

export const attrSelector = (displayValue, attributeId) => ({
  type: SELECT_ATTRIBUTE,
  payload: { displayValue, attributeId },
});

export const addToCart = (productName) => ({
  type: ADD_TO_CART,
  payload: productName,
});

export const removeFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  payload: index,
});

export const addQuantity = (productIndex) => ({
  type: INCREASE_QUANTITY,
  payload: productIndex,
});

export const reduceQuantity = (productIndex) => ({
  type: DECREASE_QUANTITY,
  payload: productIndex,
});

export const fetchAttributes = (attr) => ({
  type: FETCH_PRODUCT_ATTRIBUTES,
  payload: attr,
});

export const cartControlImage = (action, galleryLength, productIndex) => ({
  type: CART_IMAGE_CONTROL,
  payload: { action, galleryLength, productIndex },
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
        brand
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
  const products = await fetch('https://host-scandi.herokuapp.com', {
    method: 'POST',
    body: JSON.stringify({ query: productQuery }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const response = await products.json();
  dispatch(fetchProducts(response.data.category));
  dispatch(setLoadingState(false));
};

export const getProductAttributes = (productID) => async (dispatch) => {
  const detailsQuery = `{
        product(id: "${productID}") {
          id
          attributes {
            id
              name
              items {
                displayValue
                value
                id
              }
          }
        }
    }`;
  const products = await fetch('https://host-scandi.herokuapp.com', {
    method: 'POST',
    body: JSON.stringify({ query: detailsQuery }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const response = await products.json();
  dispatch(fetchAttributes(response.data.product));
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
    case FETCH_PRODUCT_ATTRIBUTES:
      return {
        ...state,
        productAttr: [
          {
            ...action.payload,
            attributes: action.payload.attributes.map((attr) => ({
              ...attr,
              items: attr.items.map((item) => ({
                ...item,
                selected: false,
              })),
            })),
          },
        ],
      };
    case ATTR_POPUP_TOGGLE:
      return {
        ...state,
        productAttr: state.allProducts.products.filter(
          (product) => product.id === action.payload,
        ),
        attrPopup: true,
      };

    case CLOSE_POPUP:
      return {
        ...state,
        attrPopup: action.payload,
      };

    case SELECT_ATTRIBUTE:
      return {
        ...state,
        productAttr: state.productAttr.map((product) => {
          product.attributes.forEach((attribute) => {
            attribute.items.forEach((value) => {
              if (
                value.displayValue === action.payload.displayValue
                && attribute.id === action.payload.attributeId
              ) {
                attribute.items.forEach((val) => {
                  if (val !== value) {
                    val.selected = false;
                  }
                });
                value.selected = true;
              }
            });
          });
          return product;
        }),
      };

    case ADD_TO_CART:
      const selectedProduct = state.allProducts.products.filter(
        (product) => product.name === action.payload,
      );
      const tope = selectedProduct.map((product) => ({
        name: product.name,
        id: product.id,
        prices: product.prices,
        gallery: product.gallery,
        attributes: product.attributes.map((attr) => ({
          ...attr,
          items: attr.items.map((item) => ({
            ...item,
          })),
        })),
      }));
      const existingProduct = state.shoppingCart.filter(
        (pro) => pro.name === tope[0].name,
      );
      if (existingProduct.length === 0) {
        state.shoppingCart.push({
          ...tope[0],
          quantity: 1,
          imgIndex: 0,
        });
      } else {
        const existingAttribute = existingProduct.find((product) => product.attributes.every(
          (attr, index) => JSON.stringify(attr) === JSON.stringify(tope[0].attributes[index]),
        ));
        if (existingAttribute) {
          existingAttribute.quantity++;
        } else {
          state.shoppingCart.push({
            ...tope[0],
            quantity: 1,
            imgIndex: 0,
          });
        }
      }
      return {
        ...state,
        shoppingCart: state.shoppingCart,
      };

    case REMOVE_FROM_CART:
      const updatedCart = [];
      state.shoppingCart.forEach((product, index) => {
        if (index !== action.payload) {
          updatedCart.push(product);
        }
      });
      return {
        ...state,
        shoppingCart: updatedCart,
      };
    case INCREASE_QUANTITY: {
      return {
        ...state,
        shoppingCart: state.shoppingCart.map((product, index) => {
          if (index === action.payload) {
            product.quantity += 1;
          }
          return product;
        }),
      };
    }
    case DECREASE_QUANTITY: {
      return {
        ...state,
        shoppingCart: state.shoppingCart.map((product, index) => {
          if (index === action.payload) {
            product.quantity -= 1;
            if (product.quantity < 1) {
              product.quantity = 1;
            }
          }
          return product;
        }),
      };
    }

    case CART_IMAGE_CONTROL:
      return {
        ...state,
        shoppingCart: state.shoppingCart.map((product, index) => {
          if (index === action.payload.productIndex) {
            if (action.payload.action === 'right') {
              product.imgIndex += 1;
              if (product.imgIndex > action.payload.galleryLength - 1) {
                product.imgIndex = 0;
              }
            } else {
              product.imgIndex -= 1;
              if (product.imgIndex < 0) {
                product.imgIndex = action.payload.galleryLength - 1;
              }
            }
          }
          return product;
        }),
      };

    default:
      return state;
  }
};

export default productListReducer;

/* eslint-enable no-param-reassign */
/* eslint-enable no-case-declarations */
/* eslint-enable no-plusplus */
/* eslint-enable default-param-last */
