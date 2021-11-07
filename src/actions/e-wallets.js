import * as api from "../api";
import { EWALLET_CHARGE, START_LOADING } from "../constants/actionTypes";

export const EWalletsCharge = (chargeData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.ewalletsCharge(chargeData);
    history.push(
      `/etalase/${chargeData.category}/order/status/${chargeData.reference_id}`
    );
    dispatch({ type: EWALLET_CHARGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
