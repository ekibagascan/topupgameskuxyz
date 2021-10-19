import React from 'react'
import {
  Grid,
  CardActionArea,
  Card,
  CardMedia,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Color from 'color'
import { Link } from 'react-router-dom'

const MyContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  margin: theme.spacing(0),
}))
const ActionArea = styled(CardActionArea)(({ theme }) => ({
  borderRadius: '15px',
  transition: '0.2s',
  '&:hover': {
    transform: 'translate(4px, -3px)',
  },
  [theme.breakpoints.down('xs')]: {
    height: '90px',
    width: '90px',
  },
}))
const MyCard = styled(Card)(({ color, theme }) => ({
  borderRadius: '10px',
  boxShadow: `rgba(255, 255, 255, 0.25) 0px 2px 8px`,
  '&:hover': {
    boxShadow: `-3px 3px 5px 0 ${Color(color)
      .rotate(-12)
      .darken(0.2)
      .fade(0.5)}`,
  },
  [theme.breakpoints.down('xs')]: {
    height: '90px',
    width: '90px',
  },
}))
const Media = styled(CardMedia)(({ theme }) => ({
  height: '100%',
  [theme.breakpoints.down('xs')]: {
    height: '90px',
    width: '90px',
  },
}))
const AppName = styled(Typography)(({ theme }) => ({
  color: '#fff',
  marginTop: '5px',
  fontSize: '0.8rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.65rem',
  },
}))

const GameCategory = ({ categorySection, categories }) => {
  return (
    <MyContainer
      container
      alignitems='center'
      alignContent='center'
      justifyItems='center'
      spacing={{ xs: 1, sm: 2, md: 4 }}
      rowSpacing={{ xs: 3, sm: 3, md: 4 }}
      columnSpacing={{ xs: 2, sm: 3, md: 4 }}
    >
      {categories.map((c) =>
        c.category === categorySection ? (
          <Grid key={c._id} item xs={4} sm={3} lg={2}>
            <ActionArea>
              <MyCard>
                <Link to={`/etalase/${c.name}`}>
                  <Media component='img' image={c.image} title={c.name} />
                </Link>
              </MyCard>
            </ActionArea>
            <AppName spacing={{ xs: 0.5, sm: 1, md: 3 }}>{c.name}</AppName>
          </Grid>
        ) : null
      )}
    </MyContainer>
  )
}

export default GameCategory
