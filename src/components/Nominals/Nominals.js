import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  ListItemButton,
  Grid,
  IconButton,
  Skeleton,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";

import { getProduct } from "../../actions/products";
import PaymentMethod from "../PaymentMethod/PaymentMethod";

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
const Voucher = styled(Grid)(() => ({
  display: "flex",
  paddingBottom: 25,
  justifyContent: "center",
  alignItems: "center",
}));
const ProductName = styled(Typography)(({ theme }) => ({
  fontWeight: 550,
  fontFamily: "Verdana",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    fontWeight: 550,
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.5rem",
    fontWeight: 500,
  },
}));
const ProductPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontFamily: "Verdana",
  color: "#316B83",
  fontSize: "0.76rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
    fontWeight: 400,
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.5rem",
    fontWeight: 300,
  },
}));
const ProductSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 230,
  height: 60,
  [theme.breakpoints.down("sm")]: {
    width: 180,
    height: 55,
  },
}));

const Nominals = ({
  products,
  category,
  productData,
  setProductData,
  handleOvoInput,
}) => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const { product, isProductLoading } = useSelector((state) => state.products);

  useEffect(() => {
    if (currentId) dispatch(getProduct(currentId));
  }, [dispatch, currentId]);

  const handleListItemClick = (name, index) => {
    setCurrentId(index);
    setProductData({
      ...productData,
      productName: name,
      productId: index,
      category: category.name,
    });
  };

  const handleDiscount = () => {
    return Math.abs((5 / 100) * 100);
  };

  return (
    <Grid>
      <MyPaper elevation={1}>
        <Title variant="h6">
          {category.form === "none" ? "Pilih Edisi" : "Pilih Nominal Top Up"}
        </Title>
        <ProductContainer
          container
          justifyContent="center"
          alignItems="stretch"
        >
          <Voucher container>
            {products.map((product) =>
              !product ? (
                <Card sx={{ margin: 1, boxShadow: "none" }}>
                  <ProductSkeleton animation="wave" variant="rectangle" />
                </Card>
              ) : (
                <ListItemButton
                  key={product._id}
                  disabled={product.stock === 0 ? true : false}
                  selected={currentId === product._id}
                  onClick={() => handleListItemClick(product.name, product._id)}
                  sx={{
                    display: "inline",
                    width: "30%",
                    textAlign: "center",
                    margin: 1,
                    border: 1,
                    borderColor: "secondary.main",
                    borderRadius: 1,
                  }}
                >
                  {currentId === product._id ? (
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
                  <ProductName
                    variant="body2"
                    sx={{ textAlign: "center", padding: 1, paddingBottom: 0 }}
                  >
                    {product.name}
                  </ProductName>
                  <ProductPrice variant="subtitle" sx={{ textAlign: "center" }}>
                    <NumberFormat
                      value={
                        product?.price +
                        (product?.price * handleDiscount()) / 100
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
                  </ProductPrice>
                </ListItemButton>
              )
            )}
          </Voucher>
        </ProductContainer>
      </MyPaper>
      <PaymentMethod
        product={product}
        isProductLoading={isProductLoading}
        currentId={currentId}
        productData={productData}
        setProductData={setProductData}
        handleOvoInput={handleOvoInput}
      />
    </Grid>
  );
};

export default Nominals;
