import {
  QRIS_CHARGE,
  GET_STATUS,
  FETCH_QRIS_PAY_DATA,
} from "../constants/actionTypes";

const initialState = {
  isQrisLoading: true,
  qris: [],
};

const qris = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isQrisLoading: true };
    case "END_LOADING":
      return { ...state, isQrisLoading: false };
    case QRIS_CHARGE:
      return { ...state, qris: [...state.qris, action?.payload] };
    case FETCH_QRIS_PAY_DATA:
      return { ...state, qrcode: action.payload.qrcode };
    case GET_STATUS:
      return { ...state, qris: action.payload.data };
    default:
      return state;
  }
};

export default qris;
