import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  Grow,
  Grid,
  Container,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import InputID from "../../components/InputID/InputID";
import Nominals from "../../components/Nominals/Nominals";
import OptionalForm from "../../components/OptionalForm/OptionalForm";
import { getCategory } from "../../actions/categories";
import { getProducts } from "../../actions/products";
import { createOrder } from "../../actions/orders";

const MainContainer = styled(Container)(() => ({
  marginTop: "80px",
  paddingLeft: 0,
  paddingRight: 0,
}));
const GridContainer = styled(Grid)(() => ({
  marginTop: "50px",
  display: "flex",
  justifyContent: "space-between",
}));
const GridEtalase = styled(Grid)(() => ({
  alignItems: "center",
  display: "flex",
}));
const MyForm = styled("form")(() => ({}));

const initialState = {
  playerId: "",
  zoneId: "",
  server: "",
  productName: "",
  totalPrice: "",
  paymentMethod: "",
  category: "",
  emailorPhone: "",
};

function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
}

const Etalase = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name } = useParams();
  const { products } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.categories);
  const [productData, setProductData] = useState(initialState);
  const [state, setState] = useState("loading (4 sec)...");
  const isMounted = useIsMounted();

  useEffect(() => {
    dispatch(getCategory(name));
    dispatch(getProducts(name)).then((data) => {
      if (isMounted.current) {
        setState(data);
      }
      return { state };
    });
  }, [dispatch, name, isMounted, state]);

  if (!products) return "Belum ada produk";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productData) {
      dispatch(createOrder({ ...productData }, history));
    }
  };

  if (!category)
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
      <MainContainer maxWidth="md">
        <GridContainer
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={{ xs: 1, sm: 1, md: 3 }}
        >
          <GridEtalase item xs={12}>
            <MyForm noValidate autoComplete="off" onSubmit={handleSubmit}>
              <InputID
                category={category}
                productData={productData}
                setProductData={setProductData}
              />

              <Nominals
                products={products}
                category={category}
                productData={productData}
                setProductData={setProductData}
              />
              <OptionalForm
                category={category}
                productData={productData}
                setProductData={setProductData}
              />
            </MyForm>
          </GridEtalase>
        </GridContainer>
      </MainContainer>
    </Grow>
  );
};

export default Etalase;
