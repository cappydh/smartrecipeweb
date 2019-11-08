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
  FETCH_RECIPE,
  FETCH_USER_RECIPES,
  FOLLOW_USER,
  FETCH_FOLLOWS,
  UNFOLLOW_USER,
  IS_FOLLOWING,
  FOLLOW_NUMBERS,
  CREATE_COMMENT,
  FETCH_COMMENTS,
  CREATE_RATING,
  FETCH_RATINGS
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

export const fetchUserRecipes = id => async dispatch => {
  const response = await recipes.get(`/recipes?userId=${id}`);

  dispatch({ type: FETCH_USER_RECIPES, payload: response.data });
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

export const followUser = (followerId, followedId) => async dispatch => {
  const response = await recipes.post("/follows", {
    followerId,
    followedId: parseInt(followedId)
  });

  dispatch({ type: FOLLOW_USER, payload: response.data });
};

export const unfollowUser = (followerId, followedId) => async dispatch => {
  const followResponse = await recipes.get(
    `/follows?followerId=${followerId}&followedId=${parseInt(followedId)}`
  );

  const response = await recipes.delete(
    `/follows/${followResponse.data[0].id}`
  );

  dispatch({ type: UNFOLLOW_USER, payload: response.data });
};

export const fetchFollows = id => async dispatch => {
  const response = await recipes.get(`/follows?followerId=${id}`);

  dispatch({ type: FETCH_FOLLOWS, payload: response.data });
};

export const isFollowing = (followerId, followedId) => async dispatch => {
  const response = await recipes.get(
    `/follows?followerId=${followerId}&followedId=${parseInt(followedId)}`
  );

  dispatch({ type: IS_FOLLOWING, payload: response.data });
};

export const followNumbers = id => async dispatch => {
  const followerNumber = await recipes.get(`/follows?followedId=${id}`);
  const followingNumber = await recipes.get(`/follows?followerId=${id}`);

  dispatch({
    type: FOLLOW_NUMBERS,
    payload: followerNumber.data.length,
    payload2: followingNumber.data.length
  });
};

export const createComment = (
  comment,
  recipeId,
  createdBy,
  createdDt,
  parentComment
) => async dispatch => {
  const response = await recipes.post("/comments", {
    comment,
    recipeId,
    createdBy,
    createdDt,
    parentComment
  });

  dispatch({ type: CREATE_COMMENT, payload: response.data });
};

export const fetchComments = id => async dispatch => {
  const response = await recipes.get(`/comments?recipeId=${id}`);

  dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const createRating = (
  ratingValue,
  createdBy,
  recipeId
) => async dispatch => {
  const response = await recipes.post("/ratings", {
    ratingValue,
    createdBy,
    recipeId
  });

  dispatch({ type: CREATE_RATING, payload: response.data });
};

export const fetchRatings = recipeId => async dispatch => {
  const response = await recipes.get(`/ratings?recipeId=${recipeId}`);

  dispatch({ type: FETCH_RATINGS, payload: response.data });
};
