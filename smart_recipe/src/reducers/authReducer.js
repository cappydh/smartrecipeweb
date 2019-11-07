import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_ERROR
} from "../actions/types";

const INITAL_STATE = {
  isSignedIn: true,
  userId: 1,
  errorMessage: null
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, [action.payload.id]: action.payload };
    case LOGIN_USER:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload,
        errorMessage: null
      };
    case LOGOUT_USER:
      return { ...state, isSignedIn: false, errorMessage: null, userId: null };
    case LOGIN_ERROR:
      return { ...state, isSignedIn: false, errorMessage: action.payload };
    default:
      return state;
  }
};
