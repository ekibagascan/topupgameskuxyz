import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_ALL_PRODUCTS,
} from "../constants/actionTypes";

const initialState = {
  isProductLoading: true,
  products: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isProductLoading: true };
    case "END_LOADING":
      return { ...state, isProductLoading: false };
    case FETCH_PRODUCT:
      return { ...state, product: action.payload.product };
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload.data };
    case FETCH_ALL_PRODUCTS:
      return { ...state, products: action.payload.data };
    default:
      return state;
  }
};

export default products;
