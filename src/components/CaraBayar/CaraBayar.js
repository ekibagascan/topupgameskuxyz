import React from "react";
import { Dialog, DialogContent, Box, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import carabayar from "../../assets/images/carabayar.png";

const ImageGuide = styled("img")(({ theme }) => ({
  width: "600px",
  [theme.breakpoints.down("sm")]: {
    width: "430px",
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
      <Button
        variant="contained"
        onClick={handleCloseEnter}
        sx={{
          position: "sticky",
          backgroundColor: "#0F00FF",
          borderRadius: "none",
        }}
      >
        <strong>Tutup</strong>
      </Button>
    </Dialog>
  );
};

export default CaraBayar;
