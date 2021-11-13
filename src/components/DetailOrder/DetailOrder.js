import React from "react";
import {
  Collapse,
  CardContent,
  Grid,
  Container,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NumberFormat from "react-number-format";

const TitleDetails = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "0.9rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));
const DetailsOrder = styled(Typography)(({ theme }) => ({
  textAlign: "end",
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));
const TotalTitle = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));
const NominalOrderList = styled(Typography)(({ theme }) => ({
  textAlign: "end",
  fontSize: "2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.9rem",
  },
}));
const Content = styled(CardContent)(() => ({
  padding: "0px 10px",
}));

const DetailOrder = ({ order, expanded }) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Content>
        <Container maxWidth="sm" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid
            container
            justifyContent="space-between"
            aligntitems="stretch"
            alignContent="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{
                  marginTop: "30px",
                  padding: 2,
                  boxShadow: `rgba(0, 0, 0, 0.25) 0px 2px 8px`,
                }}
              >
                <Grid>
                  <Typography variant="h6" sx={{ marginBottom: "5px" }}>
                    Detail Order 🧾
                  </Typography>
                  <Divider sx={{ color: "#1F1F1F" }} />
                  <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid
                      item
                      xs={12}
                      justifyContent="space-between"
                      sx={{ display: "flex" }}
                    >
                      <TitleDetails sx={{ color: "text.secondary" }}>
                        ID player:
                      </TitleDetails>
                      <DetailsOrder>{order?.playerId}</DetailsOrder>
                    </Grid>
                    {order.zoneId ? (
                      <Grid
                        item
                        xs={12}
                        justifyContent="space-between"
                        sx={{ display: "flex" }}
                      >
                        <TitleDetails sx={{ color: "text.secondary" }}>
                          Zone ID:
                        </TitleDetails>
                        <DetailsOrder>{order.zoneId}</DetailsOrder>
                      </Grid>
                    ) : null}
                    {order.server ? (
                      <Grid
                        item
                        xs={12}
                        justifyContent="space-between"
                        sx={{ display: "flex" }}
                      >
                        <TitleDetails sx={{ color: "text.secondary" }}>
                          Server/Platform:
                        </TitleDetails>
                        <DetailsOrder>{order.server}</DetailsOrder>
                      </Grid>
                    ) : null}
                    <Grid
                      item
                      xs={12}
                      justifyContent="space-between"
                      sx={{ display: "flex" }}
                    >
                      <TitleDetails sx={{ color: "text.secondary" }}>
                        Nama item:
                      </TitleDetails>
                      <DetailsOrder>{order.productName}</DetailsOrder>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      justifyContent="space-between"
                      sx={{ display: "flex" }}
                    >
                      <TitleDetails sx={{ color: "text.secondary" }}>
                        Harga item:
                      </TitleDetails>
                      <DetailsOrder>
                        {" "}
                        <NumberFormat
                          value={order.totalPrice}
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
                      </DetailsOrder>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      justifyContent="space-between"
                      sx={{ display: "flex" }}
                    >
                      <TitleDetails sx={{ color: "text.secondary" }}>
                        Bayar pake:
                      </TitleDetails>
                      <DetailsOrder>{order.paymentMethod}</DetailsOrder>
                    </Grid>
                  </Grid>
                  <Divider sx={{ color: "#1F1F1F" }} />
                  <Grid
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      display: "flex",
                      paddingLeft: 2,
                      paddingRight: 2,
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    <TotalTitle sx={{ fontWeight: 450 }}>
                      Total Order:
                    </TotalTitle>
                    <NominalOrderList
                      sx={{
                        fontWeight: 600,
                        color: "text.secondary",
                      }}
                    >
                      <NumberFormat
                        value={order.totalPrice}
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
                    </NominalOrderList>
                  </Grid>
                  <Divider sx={{ color: "#1F1F1F" }} />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Content>
    </Collapse>
  );
};

export default DetailOrder;
