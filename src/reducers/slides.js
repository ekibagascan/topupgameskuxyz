import { FETCH_ALL_SLIDES } from "../constants/actionTypes";

const initialState = {
  isSlideLoading: true,
  slides: [],
};

const slides = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isSlideLoading: true };
    case "END_LOADING":
      return { ...state, isSlideLoading: false };
    case FETCH_ALL_SLIDES:
      return { ...state, slides: action.payload.data };

    default:
      return state;
  }
};

export default slides;
