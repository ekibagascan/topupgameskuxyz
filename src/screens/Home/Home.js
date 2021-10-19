import React, { useEffect, useState, useRef } from 'react'
import { Grid, Container, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import HomeLoading from '../../components/Loading/HomeLoading'
import { getAllSlides } from '../../actions/slides'
import { getAllCategories } from '../../actions/categories'
import SlideShow from '../../components/SlideShow/SlideShow'
import GameCategory from '../../components/GameCategory/GameCategory'

function useIsMounted() {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => (isMounted.current = false)
  }, [])
  return isMounted
}

const Home = () => {
  const dispatch = useDispatch()
  const { slides } = useSelector((state) => state.slides)
  const { categories, isLoading } = useSelector((state) => state.categories)
  const [state, setState] = useState('loading (4 sec)...')
  const isMounted = useIsMounted()

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllSlides()).then((data) => {
      if (isMounted.current) {
        setState(data)
      }
      return { state }
    })
  }, [dispatch, state, isMounted])

  if (!slides) return null

  if (!categories) return null

  return isLoading ? (
    <HomeLoading />
  ) : (
    <Container maxWidth='lg' sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Grid
        container
        justifyContent='space-between'
        aligntitems='center'
        spacing={0}
        sx={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <SlideShow slides={slides} />

        <Grid>
          <Typography
            variant='h6'
            sx={{ color: '#fff', marginBottom: '8px', marginTop: '5px' }}
          >
            Trending
          </Typography>

          <GameCategory categories={categories} categorySection='trending' />

          <Typography
            variant='h6'
            sx={{ color: '#fff', marginBottom: '8px', marginTop: '20px' }}
          >
            Top Games
          </Typography>

          <GameCategory categories={categories} categorySection='topgames' />

          <Typography
            variant='h6'
            sx={{ color: '#fff', marginBottom: '8px', marginTop: '20px' }}
          >
            Livestream App
          </Typography>

          <GameCategory categories={categories} categorySection='livestream' />

          <Typography
            variant='h6'
            sx={{ color: '#fff', marginBottom: '8px', marginTop: '20px' }}
          >
            Voucher Games
          </Typography>

          <GameCategory categories={categories} categorySection='voucher' />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
