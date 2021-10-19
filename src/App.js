import React from 'react'
import { Container } from '@mui/material'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './screens/Home/Home'
import Etalase from './screens/Etalase/Etalase'
import PaymentScreen from './screens/PaymentScreen/PaymentScreen'

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth='xl' sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Switch>
          <>
            <Header />
            <Route path='/' exact component={Home} />
            <Route path='/etalase/:name' exact component={Etalase} />
            <Route path='/etalase/order/:id' exact component={PaymentScreen} />
          </>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
