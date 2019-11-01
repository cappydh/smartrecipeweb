import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import history from "../history";
import RecipeList from "./recipes/RecipeList";
import CreateRecipe from "./recipes/CreateRecipe";
import Login from "./users/Login";
import Signup from "./users/Signup";
import ShowRecipe from "./recipes/ShowRecipe";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/recipes" exact component={RecipeList} />
          <Route path="/" exact component={RecipeList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/recipes/new" exact component={CreateRecipe} />
          <Route path="/recipes/:id" exact component={ShowRecipe} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
