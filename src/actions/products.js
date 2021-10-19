import * as api from '../api'
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes'

export const getProducts = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchProducts(name)

    dispatch({ type: FETCH_PRODUCTS, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchProduct(id)

    dispatch({ type: FETCH_PRODUCT, payload: { product: data } })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}
