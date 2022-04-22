/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */

const GET_PRODUCT_DETAILS = 'store/descriptionPage/GET_PRODUCT_DETAILS';
const UPDATE_LOADINGSTATE = 'store/descriptionPage/UPDATE_LOADINGSTATE';
const CONTROL_IMAGE_VIEW = 'store/descriptionpage/CONTROL_IMAGE_VIEW';
const THUMBNAIL_CONTROL = 'store/descriptionpage/THUMBNAIL_CONTROL';


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

export const controlThumbNail = (index) => ({
  type: THUMBNAIL_CONTROL,
  payload: index,
});

export const getProductDetails = (productID) => async (dispatch) => {
  const detailsQuery = `{
        product(id: "${productID}") {
            id
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
        }
    }`;
  const products = await fetch('http://localhost:4000', {
    method: 'POST',
    body: JSON.stringify({ query: detailsQuery }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
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
        },
      };
    case CONTROL_IMAGE_VIEW:
      if (action.payload.action === 'right') {
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

    default:
      return state;
  }
};

export default productDescriptionReducer;

/* eslint-enable no-param-reassign */
/* eslint-enable no-case-declarations */
/* eslint-enable no-plusplus */
