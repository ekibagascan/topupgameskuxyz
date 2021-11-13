import {
  EWALLET_CHARGE,
  GET_STATUS,
  FETCH_EWALLET_PAY_DATA,
} from "../constants/actionTypes";

const initialState = {
  isEwalletLoading: true,
  ewallets: [],
};

const ewallets = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isEwalletLoading: true };
    case "END_LOADING":
      return { ...state, isEwalletLoading: false };
    case EWALLET_CHARGE:
      return { ...state, ewallets: [...state.ewallets, action?.payload] };
    case FETCH_EWALLET_PAY_DATA:
      return { ...state, ewallet: action.payload.ewallet };
    case GET_STATUS:
      return { ...state, ewallets: action.payload.data };
    default:
      return state;
  }
};

export default ewallets;
