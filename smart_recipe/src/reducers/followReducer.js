import { FOLLOW_USER, FETCH_FOLLOWS, UNFOLLOW_USER } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FOLLOW_USER:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_FOLLOWS:
      return [...state, ...action.payload];
    case UNFOLLOW_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};