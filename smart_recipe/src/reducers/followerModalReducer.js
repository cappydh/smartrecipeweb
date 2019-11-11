import { FETCH_FOLLOWINGS, FETCH_FOLLOWERS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FOLLOWINGS:
      return { ...state, ...action.payload };
    case FETCH_FOLLOWERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
