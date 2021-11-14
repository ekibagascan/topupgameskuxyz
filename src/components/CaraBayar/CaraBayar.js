import React from "react";
import { Dialog, DialogContent, Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import carabayar from "../../assets/images/carabayar1hape.jpg";

const ImageGuide = styled("img")(({ theme }) => ({
  width: "600px",
  [theme.breakpoints.down("sm")]: {
    width: "440px",
  },
}));

const CaraBayar = ({ enter, handleCloseEnter }) => {
  return (
    <Dialog open={enter} onClose={handleCloseEnter}>
      <DialogContent sx={{ padding: "10px 18px" }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          minHeight={360}
          color={"common.white"}
          textAlign={"center"}
        >
          <Grid justifyContent="center" sx={{ textAlign: "center" }}>
            <ImageGuide alt="carabayarqris" src={carabayar} />
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CaraBayar;
