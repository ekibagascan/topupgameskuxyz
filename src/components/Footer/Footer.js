import * as React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ textAlign: "center" }}
    >
      {"Copyright © "}
      <Link href="https://topupgamesku.xyz/" underline="none" color="inherit">
        Topupgamesku
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "20vh",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
