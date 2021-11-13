import * as api from "../api";
import {
  FETCH_CALLBACK,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export const getCallback = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchCallback(id);

    dispatch({ type: FETCH_CALLBACK, payload: { callback: data } });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
