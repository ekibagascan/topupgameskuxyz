import React from 'react'
import { Grid, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const MyBox = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  m: 1,
  width: '730px',
  height: '280px',
  backgroundColor: 'rgba(25, 3, 174, 0.7)',
  [theme.breakpoints.down('sm')]: {
    m: 1,
    height: '138px',
    width: '350px',
  },
}))

const SlideLoading = () => {
  return (
    <Grid alignitems='center' sx={{ margin: '15px auto' }}>
      <MyBox />
    </Grid>
  )
}

export default SlideLoading
