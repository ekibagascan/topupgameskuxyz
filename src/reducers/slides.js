import { FETCH_ALL_SLIDES } from '../constants/actionTypes'

const initialState = {
  isLoading: true,
  slides: [],
}

const slides = (state = initialState, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'END_LOADING':
      return { ...state, isLoading: false }
    case FETCH_ALL_SLIDES:
      return { ...state, slides: action.payload.data }

    default:
      return state
  }
}

export default slides
