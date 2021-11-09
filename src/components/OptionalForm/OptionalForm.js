import React from "react";
import { Paper, Typography, TextField, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

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
const OrderButton = styled(Button)(({ theme }) => ({
  width: "98%",
  [theme.breakpoints.down("sm")]: {
    width: "93%",
  },
}));

const OptionalForm = ({ category, productData, setProductData }) => {
  const handleClickSubmit = () => {
    setProductData({ ...productData, category: category.name });
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
          Optional!: Pengen dapat bukti pembayaran dari order kamu? Yuk isi
          Nomor WhatsApp atau email Kamu di bawah ini:
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
              label="No. WhatsApp atau Email"
              sx={{ margin: "auto 5px" }}
              value={productData.emailorPhone}
              onChange={(e) =>
                setProductData({ ...productData, emailorPhone: e.target.value })
              }
            />
          </InputForm>
        </InputContainer>
        <OrderButton
          variant="contained"
          onClick={handleClickSubmit}
          color="primary"
          type="submit"
          sx={{
            margin: "0 9px 20px 9px",
            borderRadius: 1,
            textAlign: "center",
            backgroundColor: "#9147FF",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#4E31DA",
            },
          }}
        >
          Beli Sekarang
        </OrderButton>
      </Grid>
    </MyPaper>
  );
};

export default OptionalForm;
