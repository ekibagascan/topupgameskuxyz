import { CREATE_ORDER, GET_ORDER } from '../constants/actionTypes'

const initialState = {
  isLoading: true,
  orders: [],
}

const orders = (state = initialState, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'END_LOADING':
      return { ...state, isLoading: false }
    case CREATE_ORDER:
      // localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      return { ...state, orders: [...state.orders, action?.payload] }

    case GET_ORDER:
      return { ...state, order: action.payload.order }
    default:
      return state
  }
}

export default orders
