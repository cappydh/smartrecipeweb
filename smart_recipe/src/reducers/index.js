import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import userReducer from "./userReducer";
import foundRecipes from "./foundRecipes";
import userRecipes from "./userRecipes";
import followReducer from "./followReducer";
import followerNumber from "./followerNumber";
import commentReducer from "./commentReducer";
import ratingReducer from "./ratingReducer";
import followerModalReducer from "./followerModalReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  recipes: recipeReducer,
  users: userReducer,
  foundRecipes: foundRecipes,
  userRecipes: userRecipes,
  follows: followReducer,
  followNumbers: followerNumber,
  comments: commentReducer,
  ratings: ratingReducer,
  followerModal: followerModalReducer
});
