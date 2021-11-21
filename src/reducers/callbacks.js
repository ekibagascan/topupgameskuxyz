import { FETCH_CALLBACK } from "../constants/actionTypes";

const initialState = {
  isCallbackLoading: true,
  callbacks: [],
};

const callbacks = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isCallbackLoading: true };
    case "END_LOADING":
      return { ...state, isCallbackLoading: false };
    case FETCH_CALLBACK:
      return { ...state, callback: action.payload.callback };
    default:
      return state;
  }
};

export default callbacks;
