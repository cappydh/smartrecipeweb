import _ from "lodash";
import recipes from "../../apis/recipes";
import { CREATE_COMMENT, FETCH_COMMENTS } from "./types/commentTypes";

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
