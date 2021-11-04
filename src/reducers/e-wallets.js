import { EWALLET_CHARGE, GET_STATUS } from "../constants/actionTypes";

const initialState = {
  isLoading: true,
  ewallets: [],
};

const ewallets = (state = initialState, action) => {
  switch (action.type) {
    case EWALLET_CHARGE:
      return { ...state, ewallets: action.payload.data };
    case GET_STATUS:
      return { ...state, ewallets: action.payload.data };
    default:
      return state;
  }
};

export default ewallets;
