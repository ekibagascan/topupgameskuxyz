import * as api from "../api";
import { EWALLET_CHARGE, START_LOADING } from "../constants/actionTypes";

export const EWalletsCharge = (chargeData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.ewalletsCharge(chargeData);

    dispatch({ type: EWALLET_CHARGE, payload: data });

    history.push(`/order/pay/${data.ewallet.reference_id}`);
  } catch (error) {
    console.log(error);
  }
};
