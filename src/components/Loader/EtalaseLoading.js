import React from "react";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const EtalaseLoading = () => {
  return (
    <MainContainer maxWidth="md">
      <GridContainer
        container
        justifyContent="center"
        alignItems="stretch"
        spacing={{ xs: 1, sm: 1, md: 3 }}
      >
        <GridEtalase item xs={12}></GridEtalase>
      </GridContainer>
    </MainContainer>
  );
};

export default EtalaseLoading;
