import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import userReducer from "./userReducer";
import foundRecipes from "./foundRecipes";
import userRecipes from "./userRecipes";
import followReducer from "./followReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  recipes: recipeReducer,
  users: userReducer,
  foundRecipes: foundRecipes,
  userRecipes: userRecipes,
  follows: followReducer
});
