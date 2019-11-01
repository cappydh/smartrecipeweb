import _ from "lodash";
import recipes from "../apis/recipes";
import history from "../history";
import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_ERROR,
  CREATE_RECIPE,
  FETCH_RECIPES,
  FETCH_USER,
  SEARCH_RECIPES,
  FETCH_RECIPE
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
  const { userId } = getState().auth;
  const response = await recipes.post("/recipes", { ...values, userId });

  dispatch({ type: CREATE_RECIPE, payload: response.data });
  history.push("/recipes");
};

export const fetchRecipesAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchRecipes());

  _.chain(getState().recipes)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchRecipes = () => async dispatch => {
  const response = await recipes.get("/recipes");

  dispatch({ type: FETCH_RECIPES, payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await recipes.get(`/users?id=${id}`);

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const searchRecipes = value => async dispatch => {
  const response = await recipes.get(`/recipes?name_like=${value}`);
  dispatch({ type: SEARCH_RECIPES, payload: response.data });
};

export const fetchRecipe = id => async dispatch => {
  const response = await recipes.get(`/recipes/${id}`);

  dispatch({ type: FETCH_RECIPE, payload: response.data });
};
