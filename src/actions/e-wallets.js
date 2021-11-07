import * as api from "../api";
import { EWALLET_CHARGE, START_LOADING } from "../constants/actionTypes";

export const EWalletCharge = (chargeData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.ewalletCharge(chargeData);
    history.push(
      `/etalase/${chargeData.category}/order/status/${chargeData.reference_id}`
    );
    dispatch({ type: EWALLET_CHARGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const EWalletOvoCharge = (chargeData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.ewalletOvoCharge(chargeData);
    history.push(
      `/etalase/${chargeData.category}/order/status/${chargeData.reference_id}`
    );
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
