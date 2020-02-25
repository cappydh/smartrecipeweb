import _ from "lodash";
import recipes from "../../apis/recipes";
import history from "../../history";
import {
  CREATE_RECIPE,
  FETCH_RECIPES,
  SEARCH_RECIPES,
  FETCH_RECIPE,
  FETCH_USER_RECIPES
} from "./types/recipeTypes";
import { FETCH_USER } from "./types/userTypes";

export const createRecipe = values => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await recipes.post("/recipes", { ...values, userId });

  dispatch({ type: CREATE_RECIPE, payload: response.data });
  history.push("/recipes");
};

export const fetchUser = id => async dispatch => {
  const response = await recipes.get(`/users?id=${id}`);

  dispatch({ type: FETCH_USER, payload: response.data });
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

export const fetchUserRecipes = id => async dispatch => {
  const response = await recipes.get(`/recipes?userId=${id}`);

  dispatch({ type: FETCH_USER_RECIPES, payload: response.data });
};

export const searchRecipes = value => async dispatch => {
  const response = await recipes.get(`/recipes?name_like=${value}`);
  dispatch({ type: SEARCH_RECIPES, payload: response.data });
};

export const fetchRecipe = id => async dispatch => {
  const response = await recipes.get(`/recipes/${id}`);

  dispatch({ type: FETCH_RECIPE, payload: response.data });
};
