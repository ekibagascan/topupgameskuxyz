import {
  EWALLET_CHARGE,
  GET_STATUS,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

const initialState = {
  isLoading: true,
  ewallets: [],
};

const ewallets = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case EWALLET_CHARGE:
      return { ...state, ewallets: action.payload.data };
    case GET_STATUS:
      return { ...state, ewallets: action.payload.data };
    default:
      return state;
  }
};

export default ewallets;
