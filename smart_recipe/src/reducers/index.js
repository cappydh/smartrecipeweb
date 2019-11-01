import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import userReducer from "./userReducer";
import foundRecipes from "./foundRecipes";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  recipes: recipeReducer,
  users: userReducer,
  foundRecipes: foundRecipes
});
