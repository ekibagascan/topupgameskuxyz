import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid, Link, ImageListItem, Grow, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const BannerSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 720,
  height: 288,
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    height: 144,
    width: 300,
  },
}));

const SlideShow = ({ slides, isLoading }) => {
  return (
    <Grid alignitems="center" sx={{ margin: "15px auto" }}>
      <Carousel animation="slide" swipe="true" interval={5000}>
        {slides.map((slide) => (
          <Slide key={slide._id} slide={slide} isLoading={isLoading} />
        ))}
      </Carousel>
    </Grid>
  );
};

function Slide({ slide, isLoading }) {
  return (
    <Grow in>
      <Link href={slide.link} rel="noreferrer" color="inherit" underline="none">
        <ImageListItem>
          {isLoading ? (
            <BannerSkeleton animation="wave" variant="rectangular" />
          ) : (
            <img
              alt={slide.name}
              src={`${slide.image}?w=280&fit=crop&auto=format`}
              loading="lazy"
            />
          )}
        </ImageListItem>
      </Link>
    </Grow>
  );
}

export default SlideShow;
