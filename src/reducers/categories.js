import { FETCH_ALL_CATEGORIES, FETCH_CATEGORY } from '../constants/actionTypes'

const initialState = {
  isLoading: true,
  categories: [],
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'END_LOADING':
      return { ...state, isLoading: false }
    case FETCH_ALL_CATEGORIES:
      return { ...state, categories: action.payload.data }
    case FETCH_CATEGORY:
      return { ...state, category: action.payload.category }
    default:
      return state
  }
}

export default categories
