import * as api from "../api";
import { QRIS_CHARGE, START_LOADING } from "../constants/actionTypes";

export const QrisCharge = (chargeData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.qrisCharge(chargeData);

    history.push(`/order/status/${chargeData.external_id}`);
    dispatch({ type: QRIS_CHARGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
