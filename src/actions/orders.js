import * as api from '../api'
import {
  CREATE_ORDER,
  GET_ORDER,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes'

export const createOrder = (order, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createOrder(order)

    dispatch({ type: CREATE_ORDER, payload: data })
    history.push(`/etalase/order/${data._id}`)
  } catch (error) {
    console.log(error)
  }
}

export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.fetchOrder(id)

    dispatch({ type: GET_ORDER, payload: { order: data } })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}
