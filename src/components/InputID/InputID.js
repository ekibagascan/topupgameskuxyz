import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Autocomplete,
  Chip,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NumberFormat from "react-number-format";

const MyPaper = styled(Paper)(() => ({
  width: "100%",
  marginBottom: "20px",
  boxShadow: `rgba(0, 0, 0, 0.25) 0px 2px 8px`,
}));

const Title = styled(Typography)(({ theme }) => ({
  paddingTop: 15,
  paddingLeft: 17,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    fontWeight: 550,
  },
}));
const HelperText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "0px 15px",
  },
}));
const Info = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  fontWeight: 500,
  margin: "9px 0px auto 30px",
  [theme.breakpoints.down("sm")]: {
    margin: "9px 0px auto 0px",
    padding: "0px 15px",
  },
}));
const InputField = styled(TextField)(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    "& label": {
      fontSize: "0.9rem",
    },
  },
}));

const InputContainer = styled(Grid)(() => ({
  display: "flex",
  padding: "20px 5px",
}));

const InputForm = styled(Grid)(() => ({
  display: "flex",
  paddingBottom: 5,
}));

const ServerList = styled(Autocomplete)(() => ({
  marginLeft: 8,
  width: "40%",
}));

const InputServer = styled(TextField)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    "& label": {
      fontSize: "0.9rem",
    },
  },
}));

const InputSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 300,
  height: 55,
  margin: "0px 10px 10px 10px",
  [theme.breakpoints.down("sm")]: {
    margin: "0px 10 10px",
    width: 180,
    height: 45,
  },
}));
const InputID = ({ category, productData, setProductData }) => {
  if (!category || category.form === "none") return null;

  return (
    <MyPaper key={category._id} elevation={1}>
      <Title variant="h6">{category.title}</Title>
      <InputContainer container alignItems="stretch" spacing={{ xs: 1, md: 3 }}>
        <InputForm item xs={12}>
          {!category ? (
            <InputSkeleton animation="wave" variant="rectangle" />
          ) : (
            <InputField
              name="playerId"
              id="playerId"
              variant="outlined"
              label={category.title}
              sx={{ margin: "auto 5px" }}
              value={productData.playerId}
              error={!productData.playerId && true}
              helperText={!productData.playerId && "Wajib diisi cuy!"}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  playerId: e.target.value,
                })
              }
            />
          )}
          {category.form === "double" ? (
            !category ? (
              <InputSkeleton animation="wave" variant="reactangle" />
            ) : (
              <InputField
                name="zoneId"
                id="zoneId"
                variant="outlined"
                label={category.subtitle}
                width="70%"
                sx={{ margin: "auto 5px" }}
                value={productData.zoneId}
                error={!productData.zoneId && true}
                helperText={!productData.zoneId && "Wajib diisi cuy!"}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    zoneId: e.target.value,
                  })
                }
              >
                <NumberFormat
                  format="(#####)"
                  mask="_"
                  allowEmptyFormatting={true}
                  displayType="input"
                />
              </InputField>
            )
          ) : null}
          {category.form === "doubleServer" ? (
            !category ? (
              <InputSkeleton animation="wave" variant="reactangle" />
            ) : (
              <ServerList
                id="server"
                options={category.server}
                getOptionLabel={(option) => option.toString()}
                isOptionEqualToValue={(option, value) =>
                  option.category === value.category
                }
                onChange={(e, value) =>
                  setProductData({ ...productData, server: value })
                }
                value={productData.server}
                renderInput={(params) => (
                  <InputServer
                    {...params}
                    id="server"
                    name="server"
                    label={category.subtitle}
                    variant="outlined"
                    error={!productData.server && true}
                    helperText={!productData.server && "Wajib diisi cuy!"}
                  />
                )}
              />
            )
          ) : null}
        </InputForm>
        <HelperText
          sx={{
            fontSize: "0.6rem",
            padding: "0px 30px",
          }}
        >
          {category.instruction}. Harap Cek kembali ID Anda sebelum order.
          (Kesalahan ID bukan tanggung jawab kami)
        </HelperText>
        <Grid sx={{ display: "flex" }}>
          <Info>Jam Operasional:</Info>
          <Chip
            label={category.operationTime}
            variant="contained"
            size="small"
            sx={{ margin: "8px 0px auto 5px" }}
          />
        </Grid>
      </InputContainer>
    </MyPaper>
  );
};

export default InputID;
