import { QRIS_CHARGE, GET_STATUS } from "../constants/actionTypes";

const initialState = {
  isLoading: true,
  qris: [],
};

const qris = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case QRIS_CHARGE:
      return { ...state, qris: action.payload.data };
    case GET_STATUS:
      return { ...state, qris: action.payload.data };
    default:
      return state;
  }
};

export default qris;
