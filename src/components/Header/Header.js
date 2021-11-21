import React from "react";
import { AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

import topupgameskubrand from "../../assets/images/tpg.svg";

const Grow = styled("div")(() => ({
  flexGrow: 1,
}));
const MyAppBar = styled(AppBar)(({ theme }) => ({
  padding: theme.spacing(3, 1, 3, 1),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "50px",
  backgroundColor: "#fff",
  boxShadow: `0 0.3px 6px 0 rgb(0 0 0 / 0.2)`,
  [theme.breakpoints.down("xs")]: {
    height: "40px",
  },
}));
const Brand = styled("img")(({ theme }) => ({
  margin: "2px 20px",
  [theme.breakpoints.down("sm")]: {
    margin: "2px auto",
    height: 25,
  },
}));
const BrandContainer = styled(Link)(() => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "15px",
}));

const Header = () => {
  return (
    <Grow>
      <MyAppBar id="app-bar" position="fixed">
        <BrandContainer to={"/"}>
          <Brand
            src={topupgameskubrand}
            alt="topupgameku"
            align="center"
            height={30}
          />
        </BrandContainer>
      </MyAppBar>
    </Grow>
  );
};

export default Header;
