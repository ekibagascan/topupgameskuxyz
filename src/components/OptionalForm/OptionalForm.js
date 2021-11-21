import React from "react";
import { Paper, Typography, TextField, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";

const MyPaper = styled(Paper)(() => ({
  width: "100%",
  marginBottom: "20px",
  boxShadow: `rgba(0, 0, 0, 0.25) 0px 2px 8px`,
}));
const Title = styled(Typography)(({ theme }) => ({
  paddingTop: 15,
  paddingLeft: 17,
  textAlign: "start",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    fontWeight: 550,
  },
}));
const GuidanceText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));
const InputContainer = styled(Grid)(() => ({
  display: "flex",
  padding: "20px 5px",
}));
const InputForm = styled(Grid)(() => ({
  display: "flex",
  paddingBottom: 5,
}));
const InputEmail = styled(TextField)(({ theme }) => ({
  width: "70%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    "& label": {
      fontSize: "0.9rem",
    },
  },
}));
const OrderButton = styled(LoadingButton)(({ theme }) => ({
  margin: "0 9px 20px 9px",
  borderRadius: 1,
  textAlign: "center",
  backgroundColor: "#9147FF",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#4E31DA",
  },
  width: "98%",
  [theme.breakpoints.down("sm")]: {
    width: "93%",
  },
}));

const OptionalForm = ({ productData, setProductData, loading }) => {
  const handleChargeData = () => {
    setProductData({
      ...productData,
      reference_id: productData.paymentMethod !== "Qris" && uuidv4(),
      external_id: productData.paymentMethod === "Qris" && uuidv4(),
      amount: productData.totalPrice,
      channel_code:
        productData.paymentMethod === "ShopeePay"
          ? "ID_SHOPEEPAY"
          : productData.paymentMethod === "Dana"
          ? "ID_DANA"
          : productData.paymentMethod === "LinkAja"
          ? "ID_LINKAJA"
          : productData.paymentMethod === "Ovo"
          ? "ID_OVO"
          : null,
    });
  };

  return (
    <MyPaper elevation={1}>
      <Grid textAlign="center">
        <Title variant="h6">4. Order!</Title>
        <GuidanceText
          sx={{
            marginTop: "5px",
            paddingLeft: 1.5,
            paddingRight: 1.5,
            textAlign: "start",
          }}
        >
          *Opsional! Untuk mendapatkan bukti pembayaran order, isi Nomor
          WhatsApp kamu di bawah ini 👇:
        </GuidanceText>
        <InputContainer
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={{ xs: 1, md: 3 }}
        >
          <InputForm item xs={12}>
            <InputEmail
              name="id"
              variant="outlined"
              label="No. WhatsApp"
              sx={{ margin: "auto 5px" }}
              value={productData.emailorPhone}
              onChange={(e) =>
                setProductData({ ...productData, emailorPhone: e.target.value })
              }
            />
          </InputForm>
        </InputContainer>
      </Grid>
      <OrderButton
        variant="contained"
        onClick={handleChargeData}
        loading={loading}
        disabled={!productData.productId && !productData.paymentMethod && true}
        type="submit"
      >
        Beli Sekarang 😺
      </OrderButton>
    </MyPaper>
  );
};

export default OptionalForm;
