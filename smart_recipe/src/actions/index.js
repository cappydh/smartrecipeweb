import recipes from "../apis/recipes";
import history from "../history";
import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_ERROR,
  CREATE_RECIPE,
  FETCH_RECIPES
} from "./types";

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

export const createRecipe = values => async (dispatch, getState) => {
  const { userId } = getState().users;
  const response = await recipes.post("/recipes", { ...values, userId });

  dispatch({ type: CREATE_RECIPE, payload: response.data });
  history.push("/recipes");
};

export const fetchRecipes = () => async dispatch => {
  const response = await recipes.get("/recipes");

  dispatch({ type: FETCH_RECIPES, payload: response.data });
};
