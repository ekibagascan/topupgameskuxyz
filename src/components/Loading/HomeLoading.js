import React from 'react'
import { Grid, Container, Grow, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const MyBox = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  m: 1,
  width: '730px',
  height: '280px',
  backgroundColor: '#363636',
  [theme.breakpoints.down('sm')]: {
    m: 1,
    height: '138px',
    width: '350px',
  },
}))

const MyContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  margin: theme.spacing(0),
}))

const CategoryBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  m: 0.5,
  width: '100px',
  height: '100px',
  backgroundColor: '#363636',
  [theme.breakpoints.up('sm')]: {
    m: 1,
    height: '150px',
    width: '150px',
  },
}))

const HomeLoading = () => {
  const loadingCategories = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]

  return (
    <Grow in>
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
          <Grid alignitems='center' sx={{ margin: '15px auto' }}>
            <MyBox />
          </Grid>
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
              <Grid
                key={load}
                item
                xs={4}
                sm={3}
                lg={2}
                sx={{ marginTop: '34px' }}
              >
                <CategoryBox />
              </Grid>
            ))}
          </MyContainer>
        </Grid>
      </Container>
    </Grow>
  )
}

export default HomeLoading
