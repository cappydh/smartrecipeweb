import { SEARCH_RECIPES } from "../actions/types/recipeTypes";

export default (state = [], action) => {
  switch (action.type) {
    case SEARCH_RECIPES:
      return action.payload;
    default:
      return state;
  }
};
