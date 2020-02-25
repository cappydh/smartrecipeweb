import _ from "lodash";
import recipes from "../../apis/recipes";
import history from "../../history";
import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_ERROR,
  FETCH_USER
} from "./types/userTypes";

export const createUser = formValues => async dispatch => {
  const response = await recipes.post("/users", { ...formValues });

  dispatch({ type: CREATE_USER, payload: response.data });
  history.push("/");
};

export const loginUser = formValues => async (dispatch, getState) => {
  const response = await recipes.get(`/users?username=${formValues.username}`);

  if (response.data.length !== 0) {
    if (formValues.password === response.data[0].password) {
      dispatch({ type: LOGIN_USER, payload: response.data[0].id });
      history.push("/");
    } else {
      dispatch({ type: LOGIN_ERROR, payload: "Invalid Password" });
    }
  } else {
    dispatch({ type: LOGIN_ERROR, payload: "Invalid Username" });
  }
};

export const logoutUser = () => async dispatch => {
  dispatch({ type: LOGOUT_USER });
  history.push("/");
};

export const fetchUser = id => async dispatch => {
  const response = await recipes.get(`/users?id=${id}`);

  dispatch({ type: FETCH_USER, payload: response.data });
};
