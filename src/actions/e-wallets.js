import * as api from "../api";
import { EWALLET_CHARGE, START_LOADING } from "../constants/actionTypes";

export const EwalletCharge = (chargeData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.ewalletCharge(chargeData);
    console.log(data);
    dispatch({ type: EWALLET_CHARGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// // export const GetStatusPayment = (id, history) => async (dispatch) => {
// //   try {
// //     dispatch({ type: START_LOADING });
// //     const { data } = await api.eWalletStatus(id);

// //     dispatch({ type: GET_STATUS, payload: { ewallet: data } });
// //     history.push(`/etalase/${data.category}/order/${data._id}`);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
