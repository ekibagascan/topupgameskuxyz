import React, { useEffect, useState, useRef } from "react";
import { Grid, Container, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { getAllSlides } from "../../actions/slides";
import { getAllCategories } from "../../actions/categories";
import SlideShow from "../../components/SlideShow/SlideShow";
import GameCategory from "../../components/GameCategory/GameCategory";

function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
}

const Home = () => {
  const dispatch = useDispatch();
  const { slides, isSlideLoading } = useSelector((state) => state.slides);
  const { categories, isCategoryLoading } = useSelector(
    (state) => state.categories
  );
  const [state, setState] = useState("loading (4 sec)...");
  const isMounted = useIsMounted();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllSlides()).then((data) => {
      if (isMounted.current) {
        setState(data);
      }
      return { state };
    });
  }, [dispatch, state, isMounted]);

  if (!slides) return null;

  if (!categories) return null;

  return (
    <Container maxWidth="lg" sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Grid
        container
        justifyContent="space-between"
        aligntitems="center"
        spacing={0}
        sx={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SlideShow slides={slides} isSlideLoading={isSlideLoading} />

        <Grid>
          {isCategoryLoading ? null : (
            <Typography
              variant="h6"
              sx={{ marginBottom: "8px", marginTop: "5px" }}
            >
              Trending
            </Typography>
          )}

          <GameCategory
            categories={categories}
            categorySection="trending"
            isLoading={isCategoryLoading}
          />

          {isCategoryLoading ? null : (
            <Typography
              variant="h6"
              sx={{ marginBottom: "8px", marginTop: "20px" }}
            >
              Livestream App
            </Typography>
          )}
          <GameCategory
            categories={categories}
            categorySection="livestream"
            isCategoryLoading={isCategoryLoading}
          />
          {isCategoryLoading ? null : (
            <Typography
              variant="h6"
              sx={{ marginBottom: "8px", marginTop: "20px" }}
            >
              Voucher Games
            </Typography>
          )}
          <GameCategory
            categories={categories}
            categorySection="voucher"
            isCategoryLoading={isCategoryLoading}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
