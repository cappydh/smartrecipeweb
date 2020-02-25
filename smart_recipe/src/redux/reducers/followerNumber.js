import { FOLLOW_NUMBERS } from "../actions/types/followTypes";

export default (state = [], action) => {
  switch (action.type) {
    case FOLLOW_NUMBERS:
      return {
        ...state,
        followerNumber: action.payload,
        followingNumber: action.payload2
      };
    default:
      return state;
  }
};
