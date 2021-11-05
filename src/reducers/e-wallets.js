import { EWALLET_CHARGE, GET_STATUS } from "../constants/actionTypes";

const initialState = {
  ewallets: [],
};

const ewallets = (state = initialState, action) => {
  switch (action.type) {
    case EWALLET_CHARGE:
      return { ...state, ewallets: [...state.ewallets, action?.payload] };
    // return { ...state, ewallets: action.payload.data };
    case GET_STATUS:
      return { ...state, ewallets: action.payload.data };
    default:
      return state;
  }
};

export default ewallets;
