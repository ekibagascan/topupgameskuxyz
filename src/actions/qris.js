import * as api from "../api";
import { QRIS_CHARGE, START_LOADING } from "../constants/actionTypes";

export const QrisCharge = (chargeData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.qrisCharge(chargeData);

    dispatch({ type: QRIS_CHARGE, payload: data });

    history.push(`/order/pay/${data.qris.external_id}`);
  } catch (error) {
    console.log(error);
  }
};
