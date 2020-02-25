import _ from "lodash";
import { CREATE_RATING, FETCH_RATINGS } from "../actions/types/ratingTypes";

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_RATING:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_RATINGS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
