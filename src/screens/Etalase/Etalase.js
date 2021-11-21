import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Fade, Grid, Container } from "@mui/material";
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
  const topupgamesku = JSON.parse(localStorage.getItem("TopupGamesku"));
  const { name } = useParams();
  const isMounted = useIsMounted();
  const timer = React.useRef();
  const { products } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.categories);
  const [state, setState] = useState("loading (4 sec)...");
  const [productData, setProductData] = useState(
    topupgamesku?.category === name
      ? topupgamesku
      : {
          playerId: "",
          zoneId: "",
          server: "",
          category: "",
          productName: "",
          productId: "",
          totalPrice: "",
          paymentMethod: "",
          emailorPhone: "",
          reference_id: "",
          amount: "",
          channel_code: "",
          mobile_number: "",
          external_id: "",
        }
  );

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
  }, [dispatch, name, isMounted, state, productData]);

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
    }, 4200);

    localStorage.setItem(
      "TopupGamesku",
      JSON.stringify({
        playerId: productData.playerId,
        zoneId: productData.zoneId,
        server: productData.server,
        emailorPhone: productData.emailorPhone,
        category: productData.category,
      })
    );

    e.preventDefault();
    if (productData.channel_code !== null) {
      dispatch(EWalletsCharge({ ...productData }, history));
    } else {
      dispatch(QrisCharge({ ...productData }, history));
    }
  };

  if (!category) return null;

  return (
    <Fade in>
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
    </Fade>
  );
};

export default Etalase;
