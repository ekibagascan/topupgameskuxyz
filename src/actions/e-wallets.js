import dotenv from "dotenv";
import Xendit from "xendit-node";
import { EWALLET_CHARGE } from "../constants/actionTypes";

dotenv.config();

const x = new Xendit({
  secretKey: process.env.SECRET_KEY,
});

export const EwalletCharge = (chargeData, history) => async (dispatch) => {
  const EWallet = x.EWallet;
  const ew = new EWallet({});
  try {
    const charge = await ew.createEWalletCharge({
      referenceID: chargeData._id,
      currency: "IDR",
      amount: chargeData.totalPrice,
      checkoutMethod: "ONE_TIME_PAYMENT",
      channelCode: "ID_OVO",
      channelProperties: {
        mobileNumber: chargeData.mobileNumber,
        successRedirectURL: "https://dashboard.xendit.co/register/1",
      },
      metadata: {
        branchCode: "treeBranch",
      },
    });
    // eslint-disable-next-line no-console
    console.log("created ewallet payment charge:", charge);
    dispatch({ type: EWALLET_CHARGE, payload: { charge } });
    history.push(
      `/etalase/${chargeData.category}/order/status/${chargeData._id}`
    );
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

// export const GetStatusPayment = (id, history) => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });
//     const { data } = await api.eWalletStatus(id);

//     dispatch({ type: GET_STATUS, payload: { ewallet: data } });
//     history.push(`/etalase/${data.category}/order/${data._id}`);
//   } catch (error) {
//     console.log(error);
//   }
// };
