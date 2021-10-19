import React from 'react'
import { Grid, Container, Grow, Box } from '@mui/material'
import { styled } from '@mui/material'

const MainContainer = styled(Container)(() => ({
  marginTop: '80px',
  paddingLeft: 0,
  paddingRight: 0,
}))
const GridContainer = styled(Grid)(() => ({
  marginTop: '50px',
  display: 'flex',
  justifyContent: 'space-between',
}))
const GridEtalase = styled(Grid)(() => ({
  alignItems: 'center',
  display: 'flex',
}))
const MyBox = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  m: 1,
  width: '680px',
  height: '350px',
  backgroundColor: 'rgba(25, 3, 174, 0.7)',
  [theme.breakpoints.down('sm')]: {
    m: 1,
    width: '300px',
    height: '138px',
  },
}))

const EtalaseLoading = () => {
  return (
    <Grow in>
      <MainContainer maxWidth='md'>
        <GridContainer
          container
          justifyContent='center'
          alignItems='center'
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <GridEtalase
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: 2,
            }}
          >
            <MyBox elevation={1} sx={{ margin: 1 }} />
            <MyBox elevation={1} sx={{ margin: 1 }} />
            <MyBox elevation={1} sx={{ margin: 1 }} />
          </GridEtalase>
        </GridContainer>
      </MainContainer>
    </Grow>
  )
}

export default EtalaseLoading
