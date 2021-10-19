import * as api from '../api'
import {
  FETCH_ALL_SLIDES,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes'

export const getAllSlides = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchAllSlides()

    dispatch({ type: FETCH_ALL_SLIDES, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}
