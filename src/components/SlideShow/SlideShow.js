import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid, Link, ImageListItem, Grow, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const BannerSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 720,
  height: 288,
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    height: 147,
    width: 350,
  },
}));

const SlideShow = ({ slides, isSlideLoading }) => {
  return (
    <Grid alignitems="center" sx={{ margin: "15px auto" }}>
      <Carousel animation="slide" swipe="true" interval={5000}>
        {slides.map((slide) => (
          <Slide
            key={slide._id}
            slide={slide}
            isSlideLoading={isSlideLoading}
          />
        ))}
      </Carousel>
    </Grid>
  );
};

function Slide({ slide, isSlideLoading }) {
  return (
    <Grow in>
      <Link href={slide.link} rel="noreferrer" color="inherit" underline="none">
        <ImageListItem>
          {isSlideLoading ? (
            <BannerSkeleton animation="wave" variant="rectangular" />
          ) : (
            <img
              alt={slide.name}
              src={`data:image/png;base64,${slide.image}`}
              loading="lazy"
            />
          )}
        </ImageListItem>
      </Link>
    </Grow>
  );
}

export default SlideShow;
