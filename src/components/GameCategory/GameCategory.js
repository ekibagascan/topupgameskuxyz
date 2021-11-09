import React from "react";
import {
  Grid,
  CardActionArea,
  Card,
  CardMedia,
  Typography,
  Grow,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Color from "color";
import { Link } from "react-router-dom";

const MyContainer = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  margin: theme.spacing(0),
}));
const ActionArea = styled(CardActionArea)(({ theme }) => ({
  borderRadius: "15px",
  transition: "0.2s",
  "&:hover": {
    transform: "translate(4px, -3px)",
  },
  [theme.breakpoints.down("xs")]: {
    height: "90px",
    width: "90px",
  },
}));
const MyCard = styled(Card)(({ color, theme }) => ({
  borderRadius: "10px",
  boxShadow: `rgba(0, 0, 0, 0.25) 0px 2px 8px`,
  "&:hover": {
    boxShadow: `-3px 3px 5px 0 ${Color(color)
      .rotate(-12)
      .darken(0.2)
      .fade(0.5)}`,
  },
  [theme.breakpoints.down("xs")]: {
    height: "90px",
    width: "90px",
  },
}));

const SActionArea = styled(CardActionArea)(({ theme }) => ({
  borderRadius: "15px",
  transition: "0.2s",
  [theme.breakpoints.down("xs")]: {
    height: "90px",
    width: "90px",
  },
}));
const SCard = styled(Card)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "none",
  [theme.breakpoints.down("xs")]: {
    height: "90px",
    width: "90px",
  },
}));

const Media = styled(CardMedia)(({ theme }) => ({
  height: "100%",
  [theme.breakpoints.down("xs")]: {
    height: "90px",
    width: "90px",
  },
}));

const AppName = styled(Typography)(({ theme }) => ({
  color: "#fff",
  marginTop: "5px",
  fontSize: "0.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
  },
}));

const MySkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "8px",
  width: 200,
  height: 155,
  [theme.breakpoints.down("sm")]: {
    width: 120,
    height: 105,
  },
}));

const TitleSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 170,
  height: 35,
  marginBottom: "10px",
  marginTop: "20px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "5px",
    width: 120,
    height: 25,
  },
}));

const SubtitleSkeleton = styled(Skeleton)(({ theme }) => ({
  margin: "10px auto 5px",
  width: 130,
  height: 20,
  [theme.breakpoints.down("sm")]: {
    marginTop: "10px",
    width: 90,
    height: 15,
  },
}));

const GameCategory = ({ categorySection, categories, isLoading }) => {
  return (
    <>
      {isLoading ? <TitleSkeleton animation="wave" variant="text" /> : null}
      <MyContainer
        container
        alignitems="center"
        alignContent="center"
        justifyItems="center"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        rowSpacing={{ xs: 3, sm: 3, md: 4 }}
        columnSpacing={{ xs: 2, sm: 3, md: 4 }}
      >
        {categories.map((c) =>
          c?.category === categorySection ? (
            <Grow in key={c?._id}>
              <Grid item xs={4} sm={3} lg={2}>
                {isLoading ? (
                  <SActionArea>
                    <SCard>
                      <MySkeleton animation="wave" variant="rectangular" />
                    </SCard>
                  </SActionArea>
                ) : (
                  <ActionArea>
                    <MyCard>
                      <Link to={`/etalase/${c?.name}`}>
                        <Media
                          component="img"
                          image={c?.image}
                          title={c?.name}
                        />
                      </Link>
                    </MyCard>
                  </ActionArea>
                )}
                {isLoading ? (
                  <SubtitleSkeleton animation="wave" variant="text" />
                ) : (
                  <AppName spacing={{ xs: 0.5, sm: 1, md: 3 }}>
                    {c.name}
                  </AppName>
                )}
              </Grid>
            </Grow>
          ) : null
        )}
      </MyContainer>
    </>
  );
};

export default GameCategory;
