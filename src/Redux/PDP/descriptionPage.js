import { initialState as plpState } from "../PLP/listingPage";

const GET_PRODUCT_DETAILS = "store/descriptionPage/GET_PRODUCT_DETAILS";
const UPDATE_LOADINGSTATE = "store/descriptionPage/UPDATE_LOADINGSTATE";
const CONTROL_IMAGE_VIEW = "store/descriptionpage/CONTROL_IMAGE_VIEW";
const SELECT_ATTRIBUTE = "store/descriptionPage/SELECT_ATTRIBUTE";
const THUMBNAIL_CONTROL = "store/descriptionpage/THUMBNAIL_CONTROL";
const ADD_TO_CART = "store/descriptionPage/ADD_TO_CART";

const initialState = {
  productDetails: {},
  loading: true,
  imageControl: 0,
};

const setLoadingState = (payload) => ({
  type: UPDATE_LOADINGSTATE,
  payload,
});

const fetchProductDetails = (products) => ({
  type: GET_PRODUCT_DETAILS,
  payload: products,
});

export const controlImage = (action, galleryLength) => ({
  type: CONTROL_IMAGE_VIEW,
  payload: { action, galleryLength },
});

export const attrSelector = (displayValue, attributeId) => ({
  type: SELECT_ATTRIBUTE,
  payload: { displayValue, attributeId },
});

export const controlThumbNail = (index) => ({
  type: THUMBNAIL_CONTROL,
  payload: index,
});

export const addToCart = () => ({
  type: ADD_TO_CART,
});

export const getProductDetails = (productID) => async (dispatch) => {
  const detailsQuery = `{
        product(id: "${productID}") {
            name
            gallery
            inStock
            brand
            description
            prices {
                currency {
                  label
                  symbol
                }
                amount
              }
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
  const products = await fetch("http://localhost:4000", {
    method: "POST",
    body: JSON.stringify({ query: detailsQuery }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const response = await products.json();
  dispatch(fetchProductDetails(response.data.product));
  dispatch(setLoadingState(false));
};

const productDescriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADINGSTATE:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        imageControl: 0,
        productDetails: {
          ...action.payload,
          attributes: action.payload.attributes.map((attr) => ({
            ...attr,
            items: attr.items.map((item) => ({
              ...item,
              selected: false,
            })),
          })),
        },
      };
    case CONTROL_IMAGE_VIEW:
      if (action.payload.action === "right") {
        state.imageControl += 1;
        if (state.imageControl > action.payload.galleryLength - 1) {
          state.imageControl = 0;
        }
      } else {
        state.imageControl -= 1;
        if (state.imageControl < 0) {
          state.imageControl = action.payload.galleryLength - 1;
        }
      }
      return {
        ...state,
      };
    case THUMBNAIL_CONTROL:
      return {
        ...state,
        imageControl: action.payload,
      };
    case SELECT_ATTRIBUTE:
      console.log(action.payload.displayValue, action.payload.attributeId);
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          attributes: state.productDetails.attributes.map((attribute) => {
            attribute.items.forEach((value) => {
              if (
                value.displayValue === action.payload.displayValue &&
                attribute.id === action.payload.attributeId
              ) {
                attribute.items.forEach((val) => {
                  if (val !== value) {
                    val.selected = false;
                  }
                });
                value.selected = true;
              }
            });
            return attribute;
          }),
        },
      };
    case ADD_TO_CART:
      const productToAdd = {
        name: state.productDetails.name,
        prices: state.productDetails.prices,
        gallery: state.productDetails.gallery,
        attributes: state.productDetails.attributes.map((attr) => ({
          ...attr,
          items: attr.items.map((item) => ({
            ...item,
          })),
        })),
      };
      const existingProduct = plpState.shoppingCart.filter(
        (pro) => pro.name === productToAdd.name
      );
      if (existingProduct.length === 0) {
        plpState.shoppingCart.push({
          ...productToAdd,
          quantity: 1,
        });
      } else {
        const existingAttribute = existingProduct.find((product) =>
          product.attributes.every(
            (attr, index) =>
              JSON.stringify(attr) ===
              JSON.stringify(productToAdd.attributes[index])
          )
        );
        if (existingAttribute) {
          existingAttribute.quantity++;
        } else {
          plpState.shoppingCart.push({
            ...productToAdd,
            quantity: 1,
          });
        }
      }
      return {
          ...state
      }

    
    default:
      return state;
  }
};

export default productDescriptionReducer;
