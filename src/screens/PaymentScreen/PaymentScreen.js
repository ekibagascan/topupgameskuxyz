import React, { useEffect, useRef, useState } from "react";
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
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import moment from "moment";
import PaymentsIcon from "@mui/icons-material/Payments";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import { getCallback } from "../../actions/callbacks";
import CallUs from "../../components/CallUs/CallUs";

const TitleDetails = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "0.9rem",
  fontWeight: 500,
  fontFamily: "sans-serif",
  color: "#161616",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));
const DetailsOrder = styled(Typography)(({ theme }) => ({
  textAlign: "end",
  fontSize: "1rem",
  fontWeight: 650,
  fontFamily: "sans-serif",
  color: "#000000",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));
const TotalTitle = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontWeight: 600,
  fontFamily: "sans-serif",
  fontSize: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));
const NominalOrderList = styled(Typography)(({ theme }) => ({
  textAlign: "end",
  fontSize: "2rem",
  fontWeight: 700,
  fontFamily: "sans-serif",
  color: "#000D6B",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.9rem",
  },
}));
const TextMessage = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "20px",
  fontFamily: "sans-serif",
  fontSize: "1.2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
}

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { callback, isCallbackLoading } = useSelector(
    (state) => state.callbacks
  );
  const { id } = useParams();
  const [state, setState] = useState("loading (4 sec)...");
  const isMounted = useIsMounted();
  const txData = callback?.metadata;

  const handleBack = () => {
    history.push("/");
  };

  useEffect(() => {
    dispatch(getCallback(id)).then((data) => {
      if (isMounted.current) {
        setState(data);
      }
      return { state };
    });
  }, [dispatch, id, isMounted, state]);

  if (!callback) return <Typography>No Data Available</Typography>;

  window.onload = function () {
    if (!window.location.hash & txData.isDelivered) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };

  if (isCallbackLoading)
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
    <Fade in>
      <Container maxWidth="sm" sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Grid
          container
          justifyContent="space-between"
          aligntitems="stretch"
          alignContent="center"
          spacing={0}
        >
          <Grid item xs={12}>
            {(txData?.status === "SUCCEEDED") & txData?.isDelivered ? (
              <Grid textAlign="center" sx={{ marginRight: "40px" }}>
                <IconButton
                  size="medium"
                  sx={{
                    backgroundColor: "#208EE7",
                    border: "4px solid #FFF",
                    top: 60,
                    position: "absolute",
                  }}
                >
                  <CheckIcon fontSize="large" sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            ) : txData?.status === "SUCCEEDED" ? (
              <Grid textAlign="center" sx={{ marginRight: "40px" }}>
                <IconButton
                  size="medium"
                  sx={{
                    backgroundColor: "#208EE7",
                    border: "4px solid #FFF",
                    top: 60,
                    position: "absolute",
                  }}
                >
                  <PaymentsIcon fontSize="large" sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            ) : txData?.status === "FAILED" ? (
              <Grid textAlign="center" sx={{ marginRight: "40px" }}>
                <IconButton
                  size="medium"
                  sx={{
                    backgroundColor: "#E02401",
                    border: "4px solid #FFF",
                    top: 60,
                    position: "absolute",
                  }}
                >
                  <CancelIcon fontSize="large" sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            ) : null}

            {(txData?.status === "COMPLETED") & txData?.isDelivered ? (
              <Grid textAlign="center" sx={{ marginRight: "40px" }}>
                <IconButton
                  size="medium"
                  sx={{
                    backgroundColor: "#208EE7",
                    border: "4px solid #FFF",
                    top: 60,
                    position: "absolute",
                  }}
                >
                  <CheckIcon fontSize="large" sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            ) : txData?.status === "COMPLETED" ? (
              <Grid textAlign="center" sx={{ marginRight: "40px" }}>
                <IconButton
                  size="medium"
                  sx={{
                    backgroundColor: "#208EE7",
                    border: "4px solid #FFF",
                    top: 60,
                    position: "absolute",
                  }}
                >
                  <PaymentsIcon fontSize="large" sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            ) : txData?.status === "FAILED" ? (
              <Grid textAlign="center" sx={{ marginRight: "40px" }}>
                <IconButton
                  size="medium"
                  sx={{
                    backgroundColor: "#E02401",
                    border: "4px solid #FFF",
                    top: 60,
                    position: "absolute",
                  }}
                >
                  <CancelIcon fontSize="large" sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            ) : null}
            <Paper
              elevation={2}
              sx={{
                marginTop: "80px",
                padding: 2,
                boxShadow: `rgba(0, 0, 0, 0.25) 0px 2px 8px`,
              }}
            >
              <Grid>
                <Typography
                  variant="h6"
                  sx={{
                    margin: "20px auto 5px",
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "sans-serif",
                  }}
                >
                  {(txData?.status === "SUCCEEDED") & txData?.isDelivered
                    ? "Order Berhasil 🥳"
                    : txData?.status === "SUCCEEDED"
                    ? "Pembayaran Berhasil 😎"
                    : txData?.status === "PENDING"
                    ? "Lum Dibayar Ka 😊"
                    : txData?.status === "FAILED"
                    ? "Ups Pembayaran Gagal 😶"
                    : null}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    margin: "20px auto 5px",
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "sans-serif",
                  }}
                >
                  {(txData?.status === "COMPLETED") & txData?.isDelivered
                    ? "Order Berhasil 🥳"
                    : txData?.status === "COMPLETED"
                    ? "Pembayaran Berhasil 😎"
                    : !txData?.status === "COMPLETED"
                    ? "Lum Dibayar Ka 😊"
                    : txData?.status === "FAILED"
                    ? "Ups Pembayaran Gagal 😶"
                    : null}
                </Typography>
                <Divider
                  sx={{ border: "1px dashed #bbb", margin: "20px auto" }}
                />
                <Grid container spacing={2} sx={{ padding: 2 }}>
                  <Grid
                    item
                    xs={12}
                    justifyContent="space-between"
                    sx={{ display: "flex" }}
                  >
                    <TitleDetails>Tanggal</TitleDetails>
                    <DetailsOrder>
                      {moment(txData?.created).format("MMM Do YYYY, h:mm:ss a")}
                    </DetailsOrder>
                  </Grid>

                  {txData?.playerId ? (
                    <Grid
                      item
                      xs={12}
                      justifyContent="space-between"
                      sx={{ display: "flex" }}
                    >
                      <TitleDetails>ID player</TitleDetails>
                      <DetailsOrder>{txData?.playerId}</DetailsOrder>
                    </Grid>
                  ) : null}
                  {txData?.zoneId ? (
                    <Grid
                      item
                      xs={12}
                      justifyContent="space-between"
                      sx={{ display: "flex" }}
                    >
                      <TitleDetails>Zone ID</TitleDetails>
                      <DetailsOrder>{txData?.zoneId}</DetailsOrder>
                    </Grid>
                  ) : null}
                  {txData?.server ? (
                    <Grid
                      item
                      xs={12}
                      justifyContent="space-between"
                      sx={{ display: "flex" }}
                    >
                      <TitleDetails>Server/Platform</TitleDetails>
                      <DetailsOrder>{txData?.server}</DetailsOrder>
                    </Grid>
                  ) : null}
                  <Grid
                    item
                    xs={12}
                    justifyContent="space-between"
                    sx={{ display: "flex" }}
                  >
                    <TitleDetails>Nama item</TitleDetails>
                    <DetailsOrder>{txData?.productName}</DetailsOrder>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    justifyContent="space-between"
                    sx={{ display: "flex" }}
                  >
                    <TitleDetails>Harga item</TitleDetails>
                    <DetailsOrder>
                      {" "}
                      <NumberFormat
                        value={txData?.totalPrice}
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
                    <TitleDetails>Bayar pake</TitleDetails>
                    <DetailsOrder>{txData?.paymentMethod}</DetailsOrder>
                  </Grid>
                </Grid>
                <Divider
                  sx={{ border: "1px dashed #bbb", margin: "20px auto" }}
                />
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
                  <TotalTitle>Total</TotalTitle>
                  <NominalOrderList>
                    <NumberFormat
                      value={txData?.totalPrice}
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
                <Divider
                  sx={{ border: "1px dashed #bbb", margin: "20px auto" }}
                />
                <Grid textAlign="center">
                  {(txData?.status === "SUCCEEDED") & txData?.isDelivered ? (
                    <TextMessage variant="body2">
                      Order kamu telah terkirim kini kamu siap up to the next
                      level 😊.
                    </TextMessage>
                  ) : txData?.status === "SUCCEEDED" ? (
                    <TextMessage>
                      <strong>
                        Terima kasih, pembayaran sudah kami terima{" "}
                      </strong>
                      . <br></br> Dalam 1-10 menit order otomatis akan terkirim
                      ke akun {txData?.category}-mu. 😉
                      <br></br> Jika belum terkirim silahkan hubungi kontak di
                      bawah dengan menyertakan bukti pembayaran. 👌
                    </TextMessage>
                  ) : txData?.status === "PENDING" ? (
                    <TextMessage variant="body2">
                      Belum Dibayar ka 😏.
                    </TextMessage>
                  ) : txData?.status === "FAILED" ? (
                    <TextMessage variant="body2">
                      Pembayaran gagal, silahkan ulangi lagi ordernya. 🙂
                    </TextMessage>
                  ) : null}

                  {(txData?.status === "COMPLETED") & txData?.isDelivered ? (
                    <TextMessage variant="body2">
                      Order kamu telah terkirim kini kamu siap up to the next
                      level 😊.
                    </TextMessage>
                  ) : txData?.status === "COMPLETED" ? (
                    <TextMessage>
                      <strong>
                        Terima kasih, pembayaran sudah kami terima{" "}
                      </strong>
                      😉. <br></br> Dalam 1-5 menit order otomatis akan terkirim
                      ke akun kamu.
                      <br></br> Jika belum terkirim silahkan hubungi kontak di
                      bawah ini dengan menyertakan bukti pembayaran. 👌
                    </TextMessage>
                  ) : !txData?.status === "COMPLETED" ? (
                    <TextMessage variant="body2">
                      Belum Dibayar ka 😏.
                    </TextMessage>
                  ) : txData?.status === "FAILED" ? (
                    <TextMessage variant="body2">
                      Pembayaran gagal, silahkan ulangi lagi ordernya. 🙂
                    </TextMessage>
                  ) : null}

                  {(txData?.status === "SUCCEEDED") & txData?.isDelivered ? (
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "30px auto 10px",
                        width: "90%",
                      }}
                    >
                      Beli Lagi
                    </Button>
                  ) : txData?.status === "SUCCEEDED" ? (
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "30px auto 10px",
                        width: "90%",
                      }}
                    >
                      Home
                    </Button>
                  ) : null}

                  {(txData?.status === "COMPLETED") & txData?.isDelivered ? (
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "30px auto 10px",
                        width: "90%",
                      }}
                    >
                      Beli Lagi
                    </Button>
                  ) : txData?.status === "COMPLETED" ? (
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "30px auto 10px",
                        width: "90%",
                      }}
                    >
                      Home
                    </Button>
                  ) : null}

                  {txData?.status === "FAILED" && (
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#0F00FF",
                        margin: "30px auto 10px",
                        width: "90%",
                      }}
                    >
                      Home
                    </Button>
                  )}
                  <CallUs />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default PaymentScreen;
