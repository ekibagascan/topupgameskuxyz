import React from 'react'
import {
  Paper,
  Typography,
  Grid,
  ListItemButton,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import CheckIcon from '@mui/icons-material/Check'
import NumberFormat from 'react-number-format'

import payments from '../payments'

const MyPaper = styled(Paper)(() => ({
  width: '100%',
  marginBottom: '20px',
}))
const Title = styled(Typography)(({ theme }) => ({
  paddingTop: 15,
  paddingLeft: 17,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    fontWeight: 550,
  },
}))
const ProductContainer = styled(Grid)(() => ({
  display: 'flex',
  padding: '20px 5px',
}))
const PaymentsList = styled(Grid)(() => ({
  paddingBottom: 5,
}))
const Price = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.65rem',
  },
}))
const PayLogo = styled('img')(({ theme }) => ({
  marginLeft: 2,
  display: 'flex',
  height: '40px',
  [theme.breakpoints.down('sm')]: {
    height: '25px',
    marginLeft: 0.8,
  },
}))

const PaymentMethod = ({ product, currentId, productData, setProductData }) => {
  const [selectedIndex, setSelectedIndex] = React.useState('')

  const handleListItemClick = (name, index, discount, max) => {
    setSelectedIndex(index)

    setProductData({
      ...productData,
      totalPrice:
        !discount || product?.price >= max
          ? product?.price
          : handleFinalPrice(),
      paymentMethod: name,
    })
  }

  const handleDiscount = () => {
    return Math.abs((5 / 100) * 100).toFixed(0)
  }

  const handleFinalPrice = () => {
    return (product?.price - (product.price * handleDiscount()) / 100).toFixed(
      0
    )
  }

  return (
    <MyPaper elevation={1}>
      <Title variant='h6'>3. Pilih Metode Pembayaran</Title>
      <ProductContainer
        container
        justifyContent='center'
        alignItems='stretch'
        spacing={1}
      >
        <PaymentsList item xs={12}>
          {payments.map((payment) => (
            <ListItemButton
              key={payment._id}
              selected={selectedIndex === payment._id}
              onClick={() =>
                handleListItemClick(
                  payment.name,
                  payment._id,
                  payment.discount,
                  payment.max
                )
              }
              sx={{
                margin: 1,
                border: 1,
                borderColor: 'secondary.main',
                borderRadius: 1,
              }}
            >
              {selectedIndex === payment._id ? (
                <IconButton
                  component='span'
                  sx={{
                    position: 'absolute',
                    left: 2,
                    top: 2,
                    borderRadius: '15px',
                    backgroundColor: '#9147FF',
                  }}
                >
                  <CheckIcon
                    sx={{
                      position: 'absolute',
                      height: 16,
                      color: '#fff',
                    }}
                  />
                </IconButton>
              ) : null}
              <Grid
                container
                justifyContent='space-between'
                alignItems='center'
                sx={{ display: 'flex' }}
              >
                <Grid item xs={8} sx={{ margin: 'auto' }}>
                  <PayLogo alt={payment.name} src={payment.image} />
                </Grid>

                <Grid item xs={4} sx={{ margin: 'auto', textAlign: 'end' }}>
                  {product?._id === currentId ? (
                    <Price sx={{ margin: 'auto' }}>
                      <NumberFormat
                        value={
                          !payment.discount || product.price >= payment.max
                            ? product.price
                            : handleFinalPrice()
                        }
                        displayType='text'
                        thousandSeparator={true}
                        prefix='Rp.'
                        mask=''
                        allowLeadingZeros={false}
                        allowEmptyFormatting={false}
                        fixedDecimalScale={false}
                        isNumericString={false}
                        allowNegative={true}
                        decimalSeparator='.'
                      />
                    </Price>
                  ) : null}
                </Grid>
              </Grid>
            </ListItemButton>
          ))}
        </PaymentsList>
      </ProductContainer>
    </MyPaper>
  )
}

export default PaymentMethod
