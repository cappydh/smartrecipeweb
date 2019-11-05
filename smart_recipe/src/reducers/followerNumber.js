import { FOLLOWER_NUMBER, FOLLOWING_NUMBER } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FOLLOWER_NUMBER:
      return { ...state, followerNumber: action.payload };
    case FOLLOWING_NUMBER:
      return { ...state, followingNumber: action.payload };
    default:
      return state;
  }
};
