import React from 'react'
import { Grid, Box, Paper } from '@mui/material'

const FormLoading = () => {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          '& > :not(style)': {
            m: 1,
            width: '528px',
            height: '148px',
          },
        }}
      >
        <Paper
          elevation={1}
          sx={{
            borderRadius: '8px',
            backgroundColor: 'rgba(25, 3, 174, 0.7)',
            marginBottom: '20px',
          }}
        />
      </Box>
    </Grid>
  )
}

export default FormLoading
