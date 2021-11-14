import React from "react";
import { Grid, Link, IconButton, Typography } from "@mui/material";

import wa from "../../assets/images/wa.svg";

const CallUs = () => {
  return (
    <Grid sx={{ marginTop: "20px" }}>
      <Link
        href="https://wa.me/+6288803890773"
        target="_blank"
        rel="noreferrer"
        color="inherit"
        underline="none"
      >
        <Grid
          alignItems="center"
          justifyContent="center"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <IconButton>
            <img alt="whatsapp" src={wa} height="20px" />
          </IconButton>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 400,
              color: "#4E9F3D",
            }}
          >
            Kontak kami jika kamu butuh bantuan. 🙌
          </Typography>
        </Grid>
      </Link>
    </Grid>
  );
};

export default CallUs;
