import { CREATE_COMMENT, FETCH_COMMENTS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_COMMENTS:
      return [...action.payload];
    default:
      return state;
  }
};
