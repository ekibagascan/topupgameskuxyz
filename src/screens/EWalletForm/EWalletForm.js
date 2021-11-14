import React, { useEffect, useState, useRef } from "react";
import {
  Grow,
  Grid,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Backdrop,
  Skeleton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import QRCode from "react-qr-code";
import { isDesktop, isMobile } from "react-device-detect";

import { getOrder } from "../../actions/orders";
import { getCallback } from "../../actions/callbacks";
import tpg from "../../assets/images/tpg.svg";
import payments from "../../components/payments";
import DetailOrder from "../../components/DetailOrder/DetailOrder";
import CaraBayar from "../../components/CaraBayar/CaraBayar";

const TotalTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
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
  const { id } = useParams();
  const timer = useRef();
  const { order, isOrderLoading } = useSelector((state) => state.orders);
  const { callback } = useSelector((state) => state.callbacks);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [enter, setEnter] = useState(false);

  const handleClickEnter = () => {
    setEnter(true);
  };

  const handleCloseEnter = () => {
    setEnter(false);
  };

  const handleDetailOrder = () => {
    setExpanded(!expanded);
  };

  const handleLoading = () => {
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    dispatch(getOrder(id));
    dispatch(getCallback(id));
    if (order?.paymentMethod === "Ovo") {
      if (callback?.data?.status === "SUCCEEDED") {
        history.push(`/order/status/${id}`);
      }
    } else if (order?.paymentMethod === "Qris") {
      if (callback?.status === "COMPLETED") {
        history.push(`/order/status/${id}`);
      }
    } else return null;
  }, [callback, dispatch, history, id, order?.paymentMethod]);

  if (!order) return <Typography>No Data</Typography>;

  return isOrderLoading ? (
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
                    payment.name === order?.paymentMethod ? (
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
                  {order?.paymentMethod === "Ovo" ? (
                    <Title textAlign="center" sx={{ marginBottom: "10px" }}>
                      Silahkan check aplikasi{" "}
                      <strong>{order?.paymentMethod}</strong> kamu dan segera
                      selesaikan pembayaranmu agar order dapat diproses ya.🤗
                    </Title>
                  ) : order?.paymentMethod === "Qris" ? (
                    <>
                      <Title textAlign="center" sx={{ marginBottom: "20px" }}>
                        Silahkan scan QRIS Code di bawah melalui aplikasi
                        E-Wallet atau aplikasi Bank apa saja yang kamu miliki
                        dan mendukung pembayaran QRIS. 😎
                      </Title>
                      <QRCode value={order.qris.qr_string} />
                      <Typography
                        sx={{ color: "blue", mt: "20px", fontWeight: 600 }}
                        variant="body2"
                        onClick={handleClickEnter}
                      >
                        Lihat Cara Bayar
                      </Typography>
                      <CaraBayar
                        enter={enter}
                        handleCloseEnter={handleCloseEnter}
                      />
                    </>
                  ) : order?.paymentMethod === "ShopeePay" ? (
                    <Title textAlign="center" sx={{ marginBottom: "8px" }}>
                      Klik Lanjut untuk melanjutkan ke {order?.paymentMethod}{" "}
                      untuk melakukan pembayaran. **Checkout ShopeePay hanya
                      bisa dilakukan melalui Smartphone
                    </Title>
                  ) : (
                    <Title textAlign="center" sx={{ marginBottom: "8px" }}>
                      Klik Lanjut untuk melanjutkan ke {order?.paymentMethod}{" "}
                      untuk melakukan pembayaran.
                    </Title>
                  )}
                  <Grid
                    container
                    justifyContent="space-between"
                    aligntitems="stretch"
                    alignContent="center"
                    textAlign="center"
                    onClick={handleDetailOrder}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "5px 16px",
                      backgroundColor: "#f2f2f2",
                      borderRadius: "6px",
                      marginTop: "20px",
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
                          value={order?.totalPrice}
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

                    <ArrowDropDownIcon
                      sx={{ marginTop: "5px", color: "blue" }}
                    />

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
                        {order?.category}
                      </NominalOrderList>
                    </Grid>
                    <DetailOrder expanded={expanded} order={order} />
                  </Grid>
                  {order?.paymentMethod === "Ovo" ? (
                    <Grid sx={{ paddingLeft: 2, paddingRight: 2 }}>
                      <Skeleton
                        variant="circular"
                        width={35}
                        height={35}
                        sx={{ bgcolor: "#E59934", margin: "20px auto" }}
                      />
                      <Title
                        textAlign="center"
                        sx={{ color: "#E59934", fontWeight: 600 }}
                      >
                        Menunggu Pembayaran
                      </Title>
                      <Title textAlign="center">
                        Kamu akan dialihkan setelah kamu menyelesaikan
                        pembayaran di Aplikasi{" "}
                        <strong>{order?.paymentMethod}</strong>. <br></br>
                        **Jika tidak dialihkan setelah bayar mohon untuk refresh
                        halaman 🙏
                      </Title>
                    </Grid>
                  ) : (
                    order?.paymentMethod === "Qris" && (
                      <Title
                        textAlign="center"
                        sx={{ margin: "20px auto 5px" }}
                      >
                        Kamu akan dialihkan setelah kamu menyelesaikan
                        pembayaran menggunakan metode <strong>QRIS</strong>.{" "}
                        <br></br>
                        **Jika tidak dialihkan setelah bayar mohon untuk refresh
                        halaman 🙏
                      </Title>
                    )
                  )}
                  {(order?.paymentMethod !== "Ovo") &
                  (order?.paymentMethod !== "Qris") ? (
                    <LoadingButton
                      href={
                        isMobile
                          ? order?.ewallet?.actions.mobile_web_checkout_url
                          : order?.ewallet?.actions.dekstop_web_checkout_url
                      }
                      variant="contained"
                      fullWidth
                      loading={loading}
                      onClick={handleLoading}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "30px auto 10px",
                      }}
                    >
                      Lanjut
                    </LoadingButton>
                  ) : order?.paymentMethod === "ShopeePay" ? (
                    <LoadingButton
                      href={
                        isMobile
                          ? order?.ewallet?.actions.mobile_web_checkout_url
                          : null
                      }
                      variant="contained"
                      fullWidth
                      loading={loading}
                      disabled={isDesktop && true}
                      onClick={handleLoading}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "15px auto 20px",
                      }}
                    >
                      Lanjut
                    </LoadingButton>
                  ) : null}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default EWalletForm;
