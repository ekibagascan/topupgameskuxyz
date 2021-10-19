import React, { useEffect, useState } from 'react'
import {
  Grow,
  Grid,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  ImageListItem,
  Backdrop,
  IconButton,
  Snackbar,
  Alert,
  Link,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NumberFormat from 'react-number-format'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import CaraBayar from '../../components/CaraBayar/CaraBayar'
import payments from '../../components/payments'
import { getOrder } from '../../actions/orders'

const TitleDetails = styled(Typography)(({ theme }) => ({
  textAlign: 'start',
  fontSize: '0.9rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
}))
const DetailsOrder = styled(Typography)(({ theme }) => ({
  textAlign: 'end',
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}))
const TotalTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'start',
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}))
const NominalOrderList = styled(Typography)(({ theme }) => ({
  textAlign: 'end',
  fontSize: '2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.9rem',
  },
}))
const NominalOrder = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem',
  },
}))
const StatusOrder = styled(Typography)(({ theme }) => ({
  textAlign: 'end',
  fontSize: '1.6rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.8rem',
  },
}))
const GuidanceText = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
}))
const QRCode = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    height: '180px',
  },
  [theme.breakpoints.down('xs')]: {
    height: '140px',
  },
}))

const PaymentScreen = () => {
  const dispatch = useDispatch()
  const { order, isLoading } = useSelector((state) => state.orders)
  const [copied, setCopied] = useState(false)
  const { id } = useParams()
  const [open, setOpen] = React.useState(false)
  const [enter, setEnter] = useState(false)

  const handleClick = () => {
    setCopied(true)
    if (copied === true) {
      setOpen(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleClickEnter = () => {
    setEnter(true)
  }

  const handleCloseEnter = () => {
    setEnter(false)
  }

  useEffect(() => {
    dispatch(getOrder(id))
  }, [dispatch, id])

  if (!order) return null

  if (isLoading)
    return (
      <Grid>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </Grid>
    )

  return (
    <Grow in>
      <Container maxWidth='sm' sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Grid
          container
          justifyContent='space-between'
          aligntitems='stretch'
          alignContent='center'
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ marginTop: '70px', padding: 2 }}>
              <Grid>
                <Typography
                  variant='h6'
                  sx={{ marginTop: '20px', marginBottom: '5px' }}
                >
                  Detail Order
                </Typography>
                <Divider sx={{ color: '#1F1F1F' }} />
                <Grid container spacing={2} sx={{ padding: 2 }}>
                  <Grid
                    item
                    xs={12}
                    justifyContent='space-between'
                    sx={{ display: 'flex' }}
                  >
                    <TitleDetails sx={{ color: 'text.secondary' }}>
                      ID player:
                    </TitleDetails>
                    <DetailsOrder>{order.playerId}</DetailsOrder>
                  </Grid>
                  {order.zoneId ? (
                    <Grid
                      item
                      xs={12}
                      justifyContent='space-between'
                      sx={{ display: 'flex' }}
                    >
                      <TitleDetails sx={{ color: 'text.secondary' }}>
                        Zone ID:
                      </TitleDetails>
                      <DetailsOrder>{order.zoneId}</DetailsOrder>
                    </Grid>
                  ) : null}
                  {order.server ? (
                    <Grid
                      item
                      xs={12}
                      justifyContent='space-between'
                      sx={{ display: 'flex' }}
                    >
                      <TitleDetails sx={{ color: 'text.secondary' }}>
                        Server/Platform:
                      </TitleDetails>
                      <DetailsOrder>{order.server}</DetailsOrder>
                    </Grid>
                  ) : null}
                  <Grid
                    item
                    xs={12}
                    justifyContent='space-between'
                    sx={{ display: 'flex' }}
                  >
                    <TitleDetails sx={{ color: 'text.secondary' }}>
                      Nama item:
                    </TitleDetails>
                    <DetailsOrder>{order.productName}</DetailsOrder>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    justifyContent='space-between'
                    sx={{ display: 'flex' }}
                  >
                    <TitleDetails sx={{ color: 'text.secondary' }}>
                      Harga item:
                    </TitleDetails>
                    <DetailsOrder>
                      {' '}
                      <NumberFormat
                        value={order.totalPrice}
                        displayType='text'
                        thousandSeparator='.'
                        prefix='Rp.'
                        mask=''
                        allowLeadingZeros={false}
                        allowEmptyFormatting={false}
                        fixedDecimalScale={false}
                        isNumericString={false}
                        allowNegative={true}
                        decimalSeparator=','
                      />
                    </DetailsOrder>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    justifyContent='space-between'
                    sx={{ display: 'flex' }}
                  >
                    <TitleDetails sx={{ color: 'text.secondary' }}>
                      Bayar pake:
                    </TitleDetails>
                    <DetailsOrder>{order.paymentMethod}</DetailsOrder>
                  </Grid>
                </Grid>
                <Divider sx={{ color: '#1F1F1F' }} />
                <Grid
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{
                    display: 'flex',
                    paddingLeft: 2,
                    paddingRight: 2,
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}
                >
                  <TotalTitle sx={{ fontWeight: 450 }}>Total Order:</TotalTitle>
                  <NominalOrderList
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                    }}
                  >
                    <NumberFormat
                      value={order.totalPrice}
                      displayType='text'
                      thousandSeparator='.'
                      prefix='Rp.'
                      mask=''
                      allowLeadingZeros={false}
                      allowEmptyFormatting={false}
                      fixedDecimalScale={false}
                      isNumericString={false}
                      allowNegative={true}
                      decimalSeparator=','
                    />
                  </NominalOrderList>
                </Grid>
                <Divider sx={{ color: '#1F1F1F' }} />
                <Grid
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{
                    display: 'flex',
                    paddingLeft: 2,
                    paddingRight: 2,
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}
                >
                  <TotalTitle sx={{ fontWeight: 450 }}>Status:</TotalTitle>
                  <StatusOrder
                    sx={{
                      fontWeight: 600,
                      color:
                        order.isDelivered && order.isPaid
                          ? '#9147FF'
                          : order.isPaid
                          ? '#9147FF'
                          : 'text.secondary',
                    }}
                  >
                    {order.isDelivered && order.isPaid
                      ? 'Order Terkirim'
                      : order.isPaid
                      ? 'Sudah dibayar'
                      : 'Belum dibayar'}
                  </StatusOrder>
                </Grid>
                <Divider sx={{ color: '#1F1F1F' }} />
                <Grid textAlign='center'>
                  {order.isDelivered && order.isPaid ? (
                    <Typography
                      sx={{
                        fontWeight: 500,
                        marginTop: '20px',
                      }}
                    >
                      {' '}
                      Order kamu sukses terkirim dan kamu siap naik level 😊.
                    </Typography>
                  ) : order.isPaid ? (
                    <Typography
                      sx={{
                        fontWeight: 500,
                        marginTop: '20px',
                      }}
                    >
                      {' '}
                      Terima kasih, pembayaran sudah kami terima 😉.
                    </Typography>
                  ) : (
                    <GuidanceText sx={{ marginTop: '20px' }}>
                      Silahkan scan QRIS Code di bawah melalui Aplikasi{' '}
                      <strong>{order.paymentMethod}</strong> dan input nominal
                      pembayaran sesuai total order di atas:
                    </GuidanceText>
                  )}
                  {payments.map((payment) =>
                    payment.name === order?.paymentMethod ? (
                      <Grid
                        key={payment._id}
                        item
                        xs={12}
                        sx={{ marginTop: '20px', textAlign: 'center' }}
                      >
                        <Typography variant='h6' sx={{ fontWeight: 800 }}>
                          TOPUPGAMESKU
                        </Typography>
                        {order.isDelivered && order.isPaid ? (
                          <ImageListItem sx={{ width: '80px' }}>
                            <img
                              alt='successfull'
                              src='/images/checklist.svg'
                              loading='lazy'
                            />
                          </ImageListItem>
                        ) : order.isPaid ? (
                          <ImageListItem sx={{ width: '80px' }}>
                            <img alt='paid' src='/images/PAID.svg' />
                          </ImageListItem>
                        ) : (
                          <QRCode
                            alt='qris'
                            src='/images/qrisku.png'
                            height='250px'
                            loading='lazy'
                          />
                        )}
                      </Grid>
                    ) : null
                  )}
                  <NominalOrder
                    sx={{
                      fontWeight: 600,
                      color: '#000',
                      textAlign: 'center',
                    }}
                  >
                    <CopyToClipboard
                      onCopy={() => setCopied(true)}
                      text={order.totalPrice}
                    >
                      <IconButton color='primary' onClick={handleClick}>
                        <ContentCopyIcon size='small' />
                      </IconButton>
                    </CopyToClipboard>

                    <NumberFormat
                      value={order.totalPrice}
                      displayType='text'
                      thousandSeparator='.'
                      prefix='Rp.'
                      mask=''
                      allowLeadingZeros={false}
                      allowEmptyFormatting={false}
                      fixedDecimalScale={false}
                      isNumericString={false}
                      allowNegative={true}
                      decimalSeparator=','
                    />
                  </NominalOrder>
                  <Typography
                    color='primary'
                    sx={{
                      fontWeight: 500,
                      marginTop: '5px',
                    }}
                    onClick={handleClickEnter}
                  >
                    Cara Bayar
                  </Typography>
                  <CaraBayar
                    enter={enter}
                    handleCloseEnter={handleCloseEnter}
                  />
                  <Typography
                    sx={{
                      fontWeight: 500,
                      marginTop: '15px',
                    }}
                  >
                    {order.isDelivered && order.isPaid
                      ? 'Terima kasih atas kepercayaannya.'
                      : order.isPaid
                      ? 'Order akan langsung kami kirim.'
                      : null}
                  </Typography>
                  <GuidanceText
                    sx={{ marginTop: '10px', marginBottom: '20px' }}
                  >
                    {!order.isPaid ? (
                      <strong>
                        *Harap bayar sesuai nominal dan pake Aplikasi pembayaran
                        sesuai keterangan di atas, jika tidak order tidak akan
                        diproses. Status akan berubah dan order akan dikirim
                        langsung setelah kamu melakukan pembayaran.
                      </strong>
                    ) : null}
                  </GuidanceText>
                  <Grid>
                    <Link
                      href='https://wa.me/+6288803890773'
                      target='_blank'
                      rel='noreferrer'
                      color='inherit'
                      underline='none'
                    >
                      <Grid
                        alignItems='center'
                        justifyContent='center'
                        sx={{ display: 'flex', flexDirection: 'row' }}
                      >
                        <IconButton>
                          <img
                            alt='whatsapp'
                            src='/images/wa.svg'
                            height='20px'
                          />
                        </IconButton>
                        <Typography
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 400,
                            color: '#4E9F3D',
                          }}
                        >
                          Kontak kami jika kamu butuh bantuan
                        </Typography>
                      </Grid>
                    </Link>
                  </Grid>

                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity='success'
                      sx={{ width: '100%' }}
                    >
                      Copied!
                    </Alert>
                  </Snackbar>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default PaymentScreen
