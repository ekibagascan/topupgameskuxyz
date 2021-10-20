import React from 'react'
import { AppBar, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
// import { Link } from 'react-router-dom'

const Grow = styled('div')(() => ({
  flexGrow: 1,
}))
const MyAppBar = styled(AppBar)(({ theme }) => ({
  padding: theme.spacing(3, 1, 3, 1),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '50px',
  backgroundColor: '#2A2A2A',
  boxShadow: `0 0.3px 6px 0 rgb(0 0 0 / 0.2)`,
  [theme.breakpoints.down('xs')]: {
    height: '40px',
  },
}))
const Brand = styled('img')(({ theme }) => ({
  margin: '2px 20px 2px 20px',
  height: 30,
  [theme.breakpoints.down('sm')]: {
    margin: '2px auto',
    height: 25,
  },
}))
const BrandContainer = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '15px',
}))
const ProductHunt = styled('img')(({ theme }) => ({
  width: '250px',
  height: '34px',
  margin: 'auto 0px',
  [theme.breakpoints.down('sm')]: {
    height: '24px',
  },
}))

const Header = () => {
  return (
    <Grow>
      <MyAppBar id='app-bar' position='fixed'>
        <BrandContainer href='/'>
          <Brand
            src='/images/topupgamekubrand.svg'
            alt='topupgameku'
            align='center'
          />
        </BrandContainer>
        <Link
          href='https://www.producthunt.com/posts/topupgamesku?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-topupgamesku'
          target='_blank'
          rel='noreferrer'
          color='inherit'
          underline='none'
        >
          <ProductHunt
            src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=316641&theme=dark'
            alt='Topupgamesku - The cheapest, easiest and most trusted game center payment | Product Hunt'
          />
        </Link>
        <Grow />
      </MyAppBar>
    </Grow>
  )
}

export default Header
