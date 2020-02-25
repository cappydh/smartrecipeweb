import _ from "lodash";
import recipes from "../../apis/recipes";
import { CREATE_RATING, FETCH_RATINGS } from "./types/ratingTypes";

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
