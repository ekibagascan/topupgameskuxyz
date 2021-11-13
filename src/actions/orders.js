import * as api from "../api";
import {
  GET_ORDER,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchOrder(id);

    dispatch({ type: GET_ORDER, payload: { order: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
