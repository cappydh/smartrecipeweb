import { FETCH_COMMENT_OWNERS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_COMMENT_OWNERS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
