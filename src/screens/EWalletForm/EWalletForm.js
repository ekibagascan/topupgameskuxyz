import React, { useEffect, useState } from "react";
import {
  Grow,
  Grid,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Backdrop,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";

import { getOrder } from "../../actions/orders";
import { EWalletsCharge } from "../../actions/e-wallets";
import { QrisCharge } from "../../actions/qris";
import tpg from "../../assets/images/tpg.svg";
import payments from "../../components/payments";

const InputField = styled(TextField)(({ theme }) => ({
  "& label": {
    fontSize: "1rem",
  },
  "& input:valid + fieldset": {
    borderColor: "black",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important",
  },
  [theme.breakpoints.down("sm")]: {
    "& label": {
      fontSize: "0.8rem",
    },
    "& helperText": {
      fontSize: "0.6rem",
    },
  },
}));

const TotalTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const NominalOrderList = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.7rem",
  },
}));

const EWalletForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { order, isLoading } = useSelector((state) => state.orders);
  const { id } = useParams();
  const [chargeData, setChargeData] = useState({
    reference_id: "",
    amount: "",
    channel_code: "",
    mobile_number: "",
  });
  const [qrisData, setQrisData] = useState({
    external_id: "",
    amount: "",
  });

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  const handleOvoInput = (e) => {
    setChargeData({
      ...chargeData,
      mobile_number: e.target.value,
      reference_id: order._id,
      amount: order.totalPrice,
      channel_code: "ID_OVO",
    });
  };

  const handleChargeData = () => {
    if (order.paymentMethod !== "Ovo") {
      setChargeData({
        ...chargeData,
        reference_id: order._id,
        amount: order.totalPrice,
        channel_code:
          order.paymentMethod === "ShopeePay"
            ? "ID_SHOPEEPAY"
            : order.paymentMethod === "Dana"
            ? "ID_DANA"
            : order.paymentMethod === "LinkAja"
            ? "ID_LINKAJA"
            : null,
      });
    } else return null;
    if (order.paymentMethod === "Qris") {
      setQrisData({
        ...qrisData,
        external_id: order._id,
        amount: order.totalPrice,
      });
    } else return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chargeData.channel_code !== null) {
      dispatch(EWalletsCharge({ ...chargeData }, history));
    } else {
      dispatch(QrisCharge({ ...qrisData }, history));
    }
  };

  return isLoading ? (
    <Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  ) : (
    <Grow in>
      <Container maxWidth="sm" sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Grid
          container
          justifyContent="space-between"
          aligntitems="stretch"
          alignContent="center"
          spacing={0}
        >
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ marginTop: "70px", padding: 2 }}>
                <Grid>
                  <img
                    alt="topupgamesku"
                    src={tpg}
                    loading="lazy"
                    height="30px"
                  />

                  <Divider sx={{ color: "#1F1F1F", margin: "8px auto" }} />
                  <Grid
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      display: "flex",
                      margin: "20px auto",
                      paddingLeft: 3,
                      paddingRight: 3,
                    }}
                  >
                    <Title sx={{ fontWeight: 600 }}>Bayar Pake:</Title>
                    {payments.map((payment) =>
                      payment.name === order.paymentMethod ? (
                        <img
                          key={payment._id}
                          alt="payment-method"
                          src={payment.image}
                          loading="lazy"
                          height="30px"
                        />
                      ) : null
                    )}
                  </Grid>
                  <Grid
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: 2,
                      paddingRight: 2,
                      marginBottom: "5px",
                    }}
                  >
                    {order.paymentMethod === "Ovo" ? (
                      <NumberFormat
                        label="Masukkan nomor ponsel OVO"
                        sx={{ width: "100%", margin: "8px auto" }}
                        helperText="Pastikan nomor ponsel sama dengan nomor yang terdaftar pada OVO Wallet kamu ya 👌."
                        format="+62###########"
                        allowEmptyFormatting={true}
                        customInput={InputField}
                        onChange={handleOvoInput}
                      />
                    ) : (
                      <Title textAlign="center" sx={{ marginBottom: "10px" }}>
                        Klik Lanjut untuk melanjutkan ke {order.paymentMethod}{" "}
                        untuk melakukan pembayaran
                      </Title>
                    )}

                    <Grid
                      container
                      justifyContent="space-between"
                      aligntitems="stretch"
                      alignContent="center"
                      textAlign="center"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "5px 16px",
                        backgroundColor: "#f2f2f2",
                        borderRadius: "6px",
                      }}
                    >
                      <Grid textAlign="center">
                        <TotalTitle sx={{ fontWeight: 450 }}>
                          Total Order:
                        </TotalTitle>
                        <NominalOrderList
                          sx={{
                            fontWeight: 600,
                            color: "text.secondary",
                          }}
                        >
                          <NumberFormat
                            value={order.totalPrice}
                            displayType="text"
                            thousandSeparator="."
                            prefix="Rp."
                            mask=""
                            allowLeadingZeros={false}
                            allowEmptyFormatting={false}
                            fixedDecimalScale={false}
                            isNumericString={false}
                            allowNegative={true}
                            decimalSeparator=","
                          />
                        </NominalOrderList>
                      </Grid>
                      <Grid textAlign="center">
                        <Divider orientation="vertical" flexItem />
                        <TotalTitle sx={{ fontWeight: 450 }}>
                          Category:
                        </TotalTitle>
                        <NominalOrderList
                          sx={{
                            fontWeight: 600,
                            color: "text.secondary",
                          }}
                        >
                          {order.category}
                        </NominalOrderList>
                      </Grid>
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      onClick={handleChargeData}
                      color="primary"
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "15px auto 20px",
                      }}
                    >
                      Lanjut
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </form>
        </Grid>
      </Container>
    </Grow>
  );
};

export default EWalletForm;
