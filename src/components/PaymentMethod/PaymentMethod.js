import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  ListItemButton,
  IconButton,
  Collapse,
  TextField,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import NumberFormat from "react-number-format";

import payments from "../payments";

const MyPaper = styled(Paper)(() => ({
  width: "100%",
  marginBottom: "20px",
  boxShadow: `rgba(0, 0, 0, 0.25) 0px 2px 8px`,
}));
const Title = styled(Typography)(({ theme }) => ({
  paddingTop: 15,
  paddingLeft: 17,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    fontWeight: 550,
  },
}));
const ProductContainer = styled(Grid)(() => ({
  display: "flex",
  padding: "20px 5px",
}));
const PaymentsList = styled(Grid)(() => ({
  paddingBottom: 5,
}));
const Price = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));
const PayLogo = styled("img")(({ theme }) => ({
  marginLeft: 2,
  display: "flex",
  height: "40px",
  [theme.breakpoints.down("sm")]: {
    height: "25px",
    marginLeft: 0.8,
  },
}));

const InputField = styled(TextField)(({ theme }) => ({
  "& label": {
    fontSize: "0.8rem",
  },
  "& input:valid + fieldset": {
    borderColor: "purple",
    borderWidth: 1,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 1,
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
const Content = styled(CardContent)(() => ({
  padding: "5px 10px",
}));

const PaymentMethod = ({
  product,
  isProductLoading,
  currentId,
  productData,
  setProductData,
  handleOvoInput,
}) => {
  const [selectedIndex, setSelectedIndex] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleDiscount = () => {
    return Math.abs((5 / 100) * 100);
  };

  const handleNonDiscount = () => {
    return Math.abs((12 / 100) * 100);
  };

  const handleNonDiscountOVO = () => {
    return Math.abs((13.5 / 100) * 100);
  };

  const handleFinalPriceNonDiscount = () => {
    return (
      product?.price +
      (product?.price * handleNonDiscount()) / 100
    ).toFixed(0);
  };

  const handleFinalPriceNDOVO = () => {
    return (
      product?.price +
      (product?.price * handleNonDiscountOVO()) / 100
    ).toFixed(0);
  };

  const handleFinalPriceDiscount = () => {
    return (product?.price + (product?.price * handleDiscount()) / 100).toFixed(
      0
    );
  };

  const handleListItemClick = (name, index) => {
    setSelectedIndex(index);
    setProductData({
      ...productData,
      totalPrice:
        name === "Qris"
          ? handleFinalPriceDiscount()
          : name === "ShopeePay"
          ? handleFinalPriceDiscount()
          : name === "Ovo"
          ? handleFinalPriceNDOVO()
          : handleFinalPriceNonDiscount(),
      paymentMethod: name,
    });

    if (name === "Ovo") {
      setExpanded(!expanded);
    } else {
      setExpanded(false);
    }
  };

  return (
    <MyPaper elevation={1}>
      <Title variant="h6">Pilih Metode Pembayaran</Title>
      <ProductContainer
        container
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >
        <PaymentsList item xs={12}>
          {payments.map((payment) => (
            <Grid key={payment._id}>
              <ListItemButton
                selected={selectedIndex === payment._id}
                onClick={() => handleListItemClick(payment.name, payment._id)}
                disabled={
                  handleFinalPriceDiscount() < payment.minTx ||
                  !productData.productId
                    ? true
                    : false
                }
                sx={{
                  margin: 1,
                  border: 1,
                  borderColor: "secondary.main",
                  borderRadius: 1,
                }}
              >
                {selectedIndex === payment._id ? (
                  <IconButton
                    component="span"
                    sx={{
                      position: "absolute",
                      left: 2,
                      top: 2,
                      borderRadius: "15px",
                      backgroundColor: "#9147FF",
                    }}
                  >
                    <CheckIcon
                      sx={{
                        position: "absolute",
                        height: 16,
                        color: "#fff",
                      }}
                    />
                  </IconButton>
                ) : null}
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ display: "flex" }}
                >
                  <Grid item xs={8} sx={{ margin: "auto" }}>
                    <PayLogo alt={payment?.name} src={payment?.image} />
                  </Grid>

                  <Grid item xs={4} sx={{ margin: "auto", textAlign: "end" }}>
                    {product?._id === currentId ? (
                      <>
                        <Price sx={{ margin: "auto" }}>
                          {" "}
                          Harga:{" "}
                          <NumberFormat
                            value={
                              payment.name === "Qris"
                                ? handleFinalPriceDiscount()
                                : payment.name === "ShopeePay"
                                ? handleFinalPriceDiscount()
                                : payment.name === "Ovo"
                                ? handleFinalPriceNDOVO()
                                : handleFinalPriceNonDiscount()
                            }
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
                        </Price>
                        <Typography sx={{ fontSize: "0.5rem" }}>
                          Harga sudah termasuk pajak 10%
                        </Typography>
                      </>
                    ) : isProductLoading ? (
                      <CircularProgress
                        size={20}
                        sx={{ marginRight: 2, color: "#4E31DA" }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </ListItemButton>
              {payment.name === "Ovo" ? (
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Content>
                    <NumberFormat
                      label="Masukkan nomor ponsel OVO"
                      sx={{ width: "100%", margin: "8px auto" }}
                      helperText="Pastikan nomor ponsel sama dengan nomor yang terdaftar pada OVO Wallet kamu ya 👌."
                      format="+62###########"
                      allowEmptyFormatting={true}
                      customInput={InputField}
                      onChange={handleOvoInput}
                    />
                  </Content>
                </Collapse>
              ) : null}
            </Grid>
          ))}
        </PaymentsList>
      </ProductContainer>
    </MyPaper>
  );
};

export default PaymentMethod;
