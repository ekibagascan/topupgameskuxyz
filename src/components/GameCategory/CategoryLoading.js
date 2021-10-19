import React from 'react'
import { Grid, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const MyContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  margin: theme.spacing(0),
}))

const MyBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  m: 0.5,
  width: '100px',
  height: '100px',
  backgroundColor: 'rgba(25, 3, 174, 0.7)',
  [theme.breakpoints.up('sm')]: {
    m: 1,
    height: '150px',
    width: '150px',
  },
}))

const CategoryLoading = () => {
  const loadingCategories = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]
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
      {loadingCategories.map((load) => (
        <Grid key={load} item xs={4} sm={3} lg={2} sx={{ marginTop: '34px' }}>
          <MyBox />
        </Grid>
      ))}
    </MyContainer>
  )
}

export default CategoryLoading
