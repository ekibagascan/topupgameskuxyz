import React, { useEffect } from "react";
import {
  Grow,
  Grid,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  ImageListItem,
  Backdrop,
  IconButton,
  Snackbar,
  Alert,
  Link,
  Skeleton,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";

import paid from "../../assets/images/PAID.svg";
import check from "../../assets/images/checklist.svg";
import wa from "../../assets/images/wa.svg";
import payments from "../../components/payments";
import { getCallback } from "../../actions/callbacks";
import { getOrder } from "../../actions/orders";

const TitleDetails = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "0.9rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));
const DetailsOrder = styled(Typography)(({ theme }) => ({
  textAlign: "end",
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));
const TotalTitle = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));
const StepProcess = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "1rem",
  color: "#25D366",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));
const NominalOrderList = styled(Typography)(({ theme }) => ({
  textAlign: "end",
  fontSize: "2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.9rem",
  },
}));
const StatusOrder = styled(Typography)(({ theme }) => ({
  textAlign: "end",
  fontSize: "1.6rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.8rem",
  },
}));
const GuidanceText = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { callback, isLoading } = useSelector((state) => state.callbacks);
  const { order } = useSelector((state) => state.orders);
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleBack = () => {
    history.push("/");
  };

  useEffect(() => {
    dispatch(getOrder(id));
    dispatch(getCallback(id));
  }, [dispatch, id]);

  if (!callback) return null;
  if (!order) return null;

  if (isLoading)
    return (
      <Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    );

  return (
    <Grow in>
      <Container maxWidth="sm" sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Grid
          container
          justifyContent="space-between"
          aligntitems="stretch"
          alignContent="center"
          spacing={3}
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
                <Typography
                  variant="h6"
                  sx={{ marginTop: "20px", marginBottom: "5px" }}
                >
                  Detail Order 🧾
                </Typography>
                <Divider sx={{ color: "#1F1F1F" }} />
                <Grid container spacing={2} sx={{ padding: 2 }}>
                  <Grid
                    item
                    xs={12}
                    justifyContent="space-between"
                    sx={{ display: "flex" }}
                  >
                    <TitleDetails sx={{ color: "text.secondary" }}>
                      ID player:
                    </TitleDetails>
                    <DetailsOrder>{order?.playerId}</DetailsOrder>
                  </Grid>
                  {order?.zoneId ? (
                    <Grid
                      item
                      xs={12}
                      justifyContent="space-between"
                      sx={{ display: "flex" }}
                    >
                      <TitleDetails sx={{ color: "text.secondary" }}>
                        Zone ID:
                      </TitleDetails>
                      <DetailsOrder>{order?.zoneId}</DetailsOrder>
                    </Grid>
                  ) : null}
                  {order?.server ? (
                    <Grid
                      item
                      xs={12}
                      justifyContent="space-between"
                      sx={{ display: "flex" }}
                    >
                      <TitleDetails sx={{ color: "text.secondary" }}>
                        Server/Platform:
                      </TitleDetails>
                      <DetailsOrder>{order?.server}</DetailsOrder>
                    </Grid>
                  ) : null}
                  <Grid
                    item
                    xs={12}
                    justifyContent="space-between"
                    sx={{ display: "flex" }}
                  >
                    <TitleDetails sx={{ color: "text.secondary" }}>
                      Nama item:
                    </TitleDetails>
                    <DetailsOrder>{order?.productName}</DetailsOrder>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    justifyContent="space-between"
                    sx={{ display: "flex" }}
                  >
                    <TitleDetails sx={{ color: "text.secondary" }}>
                      Harga item:
                    </TitleDetails>
                    <DetailsOrder>
                      {" "}
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
                    </DetailsOrder>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    justifyContent="space-between"
                    sx={{ display: "flex" }}
                  >
                    <TitleDetails sx={{ color: "text.secondary" }}>
                      Bayar pake:
                    </TitleDetails>
                    <DetailsOrder>{order.paymentMethod}</DetailsOrder>
                  </Grid>
                </Grid>
                <Divider sx={{ color: "#1F1F1F" }} />
                <Grid
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    display: "flex",
                    paddingLeft: 2,
                    paddingRight: 2,
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <TotalTitle sx={{ fontWeight: 450 }}>Total Order:</TotalTitle>
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
                <Divider sx={{ color: "#1F1F1F" }} />
                <Grid
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    display: "flex",
                    paddingLeft: 2,
                    paddingRight: 2,
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <TotalTitle sx={{ fontWeight: 450 }}>Status:</TotalTitle>
                  <StatusOrder
                    sx={{
                      fontWeight: 600,
                      color:
                        (callback.data.status === "SUCCEEDED") &
                        order.isDelivered
                          ? "#9147FF"
                          : callback.data.status === "SUCCEEDED"
                          ? "#9147FF"
                          : "text.secondary",
                    }}
                  >
                    {(callback.data.status === "SUCCEEDED") & order.isDelivered
                      ? "Order Sukses🥳"
                      : callback.data.status === "SUCCEEDED"
                      ? "Pembayaran Berhasil😎"
                      : "Lum bayar Ka😁"}
                  </StatusOrder>
                </Grid>
                <Divider sx={{ color: "#1F1F1F" }} />
                <Grid textAlign="center">
                  {payments.map((payment) =>
                    payment.name === order?.paymentMethod ? (
                      <Grid
                        key={payment._id}
                        item
                        xs={12}
                        sx={{ marginTop: "20px", textAlign: "center" }}
                      >
                        {(callback.data.status === "SUCCEEDED") &
                        order.isDelivered ? (
                          <ImageListItem sx={{ width: "80px" }}>
                            <img alt="successfull" src={check} loading="lazy" />
                          </ImageListItem>
                        ) : callback.data.status === "SUCCEEDED" ? (
                          <ImageListItem sx={{ width: "200px" }}>
                            <img alt="paid" src={paid} />
                          </ImageListItem>
                        ) : !order.isPaid ? (
                          <Skeleton
                            sx={{ margin: "5px auto", bgcolor: "#25D366" }}
                            variant="circular"
                            width={40}
                            height={40}
                          />
                        ) : null}
                      </Grid>
                    ) : null
                  )}

                  {(callback.data.status === "SUCCEEDED") &
                  order.isDelivered ? (
                    <Typography
                      sx={{
                        fontWeight: 500,
                        marginTop: "20px",
                      }}
                    >
                      {" "}
                      Order kamu sukses terkirim dan kamu siap naik level 😊.
                    </Typography>
                  ) : callback.data.status === "SUCCEEDED" ? (
                    <Typography
                      sx={{
                        fontWeight: 500,
                        marginTop: "20px",
                      }}
                    >
                      {" "}
                      Terima kasih, pembayaran sudah kami terima 😉.
                    </Typography>
                  ) : (
                    <Box sx={{ maxWidth: "250px", margin: "auto" }}>
                      <StepProcess sx={{ margin: "20px auto 5px" }}>
                        <strong>Proses Pembayaran</strong>
                      </StepProcess>
                      {order.paymentMethod !== "Qris" ? (
                        <GuidanceText sx={{ margin: "0px auto 20px" }}>
                          Silahkan check aplikasi{" "}
                          <strong>{order.paymentMethod}</strong> kamu dan segera
                          selesaikan pembayaranmu agar order dapat diproses
                          ya.🤗
                        </GuidanceText>
                      ) : null}
                    </Box>
                  )}
                  {(callback.data.status === "SUCCEEDED") &
                  order.isDelivered ? (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleBack}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "20px auto 20px",
                      }}
                    >
                      Beli Lagi
                    </Button>
                  ) : null}

                  <Grid sx={{ marginTop: "10px" }}>
                    <Link
                      href="https://wa.me/+6288803890773"
                      target="_blank"
                      rel="noreferrer"
                      color="inherit"
                      underline="none"
                    >
                      <Grid
                        alignItems="center"
                        justifyContent="center"
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <IconButton>
                          <img alt="whatsapp" src={wa} height="20px" />
                        </IconButton>
                        <Typography
                          sx={{
                            fontSize: "0.7rem",
                            fontWeight: 400,
                            color: "#4E9F3D",
                          }}
                        >
                          Kontak kami jika kamu butuh bantuan.👌
                        </Typography>
                      </Grid>
                    </Link>
                  </Grid>

                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Copied!
                    </Alert>
                  </Snackbar>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default PaymentScreen;
