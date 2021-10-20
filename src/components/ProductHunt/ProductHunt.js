import React from 'react'
import { Link } from '@mui/material'
import { styled } from '@mui/material/styles'

const PH = styled('img')(({ theme }) => ({
  width: '250px',
  height: '34px',
  margin: 'auto 0px',
  [theme.breakpoints.down('sm')]: {
    height: '30px',
    margin: 'auto 0px auto 40px',
  },
}))

const ProductHunt = () => {
  return (
    <Link
      href='https://www.producthunt.com/posts/topupgamesku?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-topupgamesku'
      target='_blank'
      rel='noreferrer'
      color='inherit'
      underline='none'
    >
      <PH
        src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=316641&theme=dark'
        alt='Topupgamesku - The cheapest, easiest and most trusted game center payment | Product Hunt'
      />
    </Link>
  )
}

export default ProductHunt
