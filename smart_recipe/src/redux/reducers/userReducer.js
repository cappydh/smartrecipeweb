import _ from "lodash";
import { FETCH_USER } from "../actions/types/userTypes";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
