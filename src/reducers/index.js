import { combineReducers } from 'redux'

import products from './products'
import categories from './categories'
import orders from './orders'
import slides from './slides'

export default combineReducers({ products, categories, orders, slides })
