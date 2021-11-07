import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid, Link, ImageListItem, Grow } from "@mui/material";

const SlideShow = ({ slides }) => {
  return (
    <Grid alignitems="center" sx={{ margin: "15px auto" }}>
      <Carousel animation="slide" swipe="true" interval={5000}>
        {slides.map((slide) => (
          <Slide key={slide._id} slide={slide} />
        ))}
      </Carousel>
    </Grid>
  );
};

function Slide({ slide }) {
  return (
    <Grow in>
      <Link href={slide.link} rel="noreferrer" color="inherit" underline="none">
        <ImageListItem>
          <img
            alt={slide.name}
            src={`${slide.image}?w=280&fit=crop&auto=format`}
            loading="lazy"
          />
        </ImageListItem>
      </Link>
    </Grow>
  );
}

export default SlideShow;
