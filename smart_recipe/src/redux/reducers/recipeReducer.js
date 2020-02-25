import _ from "lodash";
import {
  CREATE_RECIPE,
  FETCH_RECIPES,
  FETCH_RECIPE
} from "../actions/types/recipeTypes";

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_RECIPES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
