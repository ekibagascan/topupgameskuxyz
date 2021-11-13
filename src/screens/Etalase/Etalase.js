import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Grow, Grid, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

import InputID from "../../components/InputID/InputID";
import Nominals from "../../components/Nominals/Nominals";
import OptionalForm from "../../components/OptionalForm/OptionalForm";
import { getCategory } from "../../actions/categories";
import { getProducts } from "../../actions/products";
import { QrisCharge } from "../../actions/qris";
import { EWalletsCharge } from "../../actions/e-wallets";

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

const initialState = {
  playerId: "",
  zoneId: "",
  server: "",
  productName: "",
  productId: "",
  totalPrice: "",
  paymentMethod: "",
  category: "",
  emailorPhone: "",

  reference_id: "",
  amount: "",
  channel_code: "",
  mobile_number: "",
  external_id: "",
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
  const isMounted = useIsMounted();
  const timer = React.useRef();
  const { products } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.categories);
  const [state, setState] = useState("loading (4 sec)...");
  const [productData, setProductData] = useState(initialState);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    dispatch(getCategory(name)).then((data) => {
      if (isMounted.current) {
        setState(data);
      }
      return { state };
    });
    dispatch(getProducts(name)).then((data) => {
      if (isMounted.current) {
        setState(data);
      }
      return { state };
    });
  }, [dispatch, name, isMounted, state]);

  if (!products) return "Belum ada produk";

  const handleOvoInput = (e) => {
    setProductData({
      ...productData,
      mobile_number: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setLoading(false);
    }, 2500);
    e.preventDefault();
    if (productData.channel_code !== null) {
      dispatch(EWalletsCharge({ ...productData }, history));
    } else {
      dispatch(QrisCharge({ ...productData }, history));
    }
  };

  if (!category) return null;

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
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                handleOvoInput={handleOvoInput}
              />
              <OptionalForm
                productData={productData}
                setProductData={setProductData}
                loading={loading}
              />
            </form>
          </GridEtalase>
        </GridContainer>
      </MainContainer>
    </Grow>
  );
};

export default Etalase;
