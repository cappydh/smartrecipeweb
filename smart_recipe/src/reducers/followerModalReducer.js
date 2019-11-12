import _ from "lodash";
import { FETCH_FOLLOWINGS, FETCH_FOLLOWERS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FOLLOWINGS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_FOLLOWERS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
