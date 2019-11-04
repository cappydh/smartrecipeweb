import { FETCH_USER_RECIPES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_RECIPES:
      return [...action.payload];
    default:
      return state;
  }
};
