import _ from "lodash";
import { FETCH_USER_RECIPES } from "../actions/types/recipeTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_RECIPES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
