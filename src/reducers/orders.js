import {
  CREATE_ORDER,
  GET_ORDER,
  UPDATE_ORDER,
} from "../constants/actionTypes";

const initialState = {
  isOrderLoading: true,
  orders: [],
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isOrderLoading: true };
    case "END_LOADING":
      return { ...state, isOrderLoading: false };
    case CREATE_ORDER:
      return { ...state, orders: [...state.orders, action?.payload] };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };
    case GET_ORDER:
      return { ...state, order: action?.payload.order };
    default:
      return state;
  }
};

export default orders;
