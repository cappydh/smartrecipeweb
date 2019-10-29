import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import recipeReducer from "./recipeReducer";

export default combineReducers({
  form: formReducer,
  users: userReducer,
  recipes: recipeReducer
});
