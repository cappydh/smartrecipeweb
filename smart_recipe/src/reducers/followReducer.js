import {
  FOLLOW_USER,
  FETCH_FOLLOWS,
  UNFOLLOW_USER,
  IS_FOLLOWING
} from "../actions/types";

const INITAL_STATE = {
  isFollowing: null
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        [action.payload.id]: action.payload,
        isFollowing: true
      };
    case FETCH_FOLLOWS:
      return { ...state, ...action.payload };
    case UNFOLLOW_USER:
      return { ...state, ...action.payload, isFollowing: false };
    case IS_FOLLOWING:
      if (action.payload.length > 0) {
        return { ...state, isFollowing: true };
      }
      return { ...state, isFollowing: false };
    default:
      return state;
  }
};
