import React, { useEffect, useState, useRef } from "react";
import {
  Fade,
  Grid,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Backdrop,
  Button,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import QRCode from "react-qr-code";
import { isDesktop, isMobile } from "react-device-detect";

import { getOrder } from "../../actions/orders";
import tpg from "../../assets/images/tpg.svg";
import payments from "../../components/payments";
import DetailOrder from "../../components/DetailOrder/DetailOrder";
import CaraBayar from "../../components/CaraBayar/CaraBayar";

function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
}

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
  const { order, isOrderLoading } = useSelector((state) => state.orders);
  const [expanded, setExpanded] = useState(false);
  const [enter, setEnter] = useState(false);
  const [state, setState] = useState("loading (10 sec)...");
  const isMounted = useIsMounted();
  const orderData = order?.metadata;

  const handleClickEnter = () => {
    setEnter(true);
  };

  const handleCloseEnter = () => {
    setEnter(false);
  };

  const handleDetailOrder = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch(getOrder(id)).then((data) => {
      if (isMounted.current) {
        setState(data);
      }
      return { state };
    });
  }, [dispatch, isMounted, id, state]);

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
    <Fade in>
      <Container maxWidth="sm" sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Grid
          container
          justifyContent="space-between"
          aligntitems="stretch"
          alignContent="center"
          spacing={0}
        >
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                marginTop: "70px",
                padding: 2,
                boxShadow: `rgba(0, 0, 0, 0.25) 0px 2px 8px`,
              }}
            >
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
                    payment.name === orderData.paymentMethod ? (
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
                  {orderData.paymentMethod === "Ovo" ? (
                    <Title textAlign="center" sx={{ marginBottom: "10px" }}>
                      Silahkan check aplikasi{" "}
                      <strong>{orderData.paymentMethod}</strong> kamu dan segera
                      selesaikan pembayaranmu dalam waktu kurang dari{" "}
                      <strong>45 detik</strong> agar order dapat diproses ya.🤗
                    </Title>
                  ) : orderData.paymentMethod === "Qris" ? (
                    <>
                      <Title textAlign="center" sx={{ marginBottom: "20px" }}>
                        Silahkan scan QRIS Code di bawah melalui aplikasi
                        E-Wallet atau aplikasi Bank apa saja yang kamu miliki
                        dan mendukung pembayaran QRIS. 😎
                      </Title>
                      <QRCode value={order?.qris.qr_string} />
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
                  ) : orderData.paymentMethod === "ShopeePay" ? (
                    <Title textAlign="center" sx={{ marginBottom: "8px" }}>
                      Klik Lanjut untuk melanjutkan ke {orderData.paymentMethod}{" "}
                      untuk melakukan pembayaran. **Checkout ShopeePay hanya
                      bisa dilakukan melalui Smartphone.
                    </Title>
                  ) : (
                    <Title textAlign="center" sx={{ marginBottom: "8px" }}>
                      Klik Lanjut untuk melanjutkan ke {orderData.paymentMethod}{" "}
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
                          value={orderData.totalPrice || orderData.totalPrice}
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

                    {expanded ? (
                      <ArrowDropUpIcon
                        sx={{ marginTop: "5px", color: "blue" }}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        sx={{ marginTop: "5px", color: "blue" }}
                      />
                    )}

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
                        {orderData.category || orderData.category}
                      </NominalOrderList>
                    </Grid>
                    <DetailOrder expanded={expanded} orderData={orderData} />
                  </Grid>
                  {orderData.paymentMethod === "Ovo" ? (
                    <Button
                      variant="contained"
                      onClick={() => history.push(`/order/status/${id}`)}
                      fullWidth
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "30px auto 10px",
                      }}
                    >
                      Cek Status
                    </Button>
                  ) : (
                    orderData.paymentMethod === "Qris" && (
                      <Button
                        variant="contained"
                        onClick={() => history.push(`/order/status/${id}`)}
                        fullWidth
                        sx={{
                          borderRadius: "15px",
                          backgroundColor: "#000",
                          margin: "30px auto 10px",
                          boxShadow: `rgba(0, 0, 0, 0.25) 0px 2px 8px`,
                        }}
                      >
                        Cek Status
                      </Button>
                    )
                  )}
                  {orderData.paymentMethod === "Dana" && (
                    <Button
                      href={
                        isMobile
                          ? order?.ewallet?.actions.mobile_web_checkout_url
                          : order?.ewallet?.actions.dekstop_web_checkout_url
                      }
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0088E4",
                        margin: "30px auto 10px",
                      }}
                    >
                      Lanjut ke Dana
                    </Button>
                  )}

                  {orderData.paymentMethod === "LinkAja" && (
                    <Button
                      href={
                        isMobile
                          ? order?.ewallet?.actions.mobile_web_checkout_url
                          : order?.ewallet?.actions.dekstop_web_checkout_url
                      }
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "red",
                        margin: "30px auto 10px",
                      }}
                    >
                      Lanjut LinkAja
                    </Button>
                  )}
                  {orderData.paymentMethod === "ShopeePay" && (
                    <Button
                      href={
                        order?.ewallet?.actions.mobile_deeplink_checkout_url
                      }
                      variant="contained"
                      fullWidth
                      disabled={isDesktop && true}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#E74B2E",
                        margin: "15px auto 20px",
                      }}
                    >
                      Lanjut Shopee
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default EWalletForm;
