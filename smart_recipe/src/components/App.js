import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import history from "../history";
import RecipeList from "./recipes/RecipeList";
import CreateRecipe from "./recipes/CreateRecipe";
import Login from "./users/Login";
import Signup from "./users/Signup";
import ShowRecipe from "./recipes/ShowRecipe";
import ShowUser from "./users/ShowUser";
import ShowFollowers from "./users/ShowFollowers";
import ShowFollowings from "./users/ShowFollowings";

const App = () => {
  return (
    <Router history={history}>
      <div
        style={{
          backgroundColor: "rgb(	171, 0, 18)",
          height: "61.56px",
          width: "100%",
          zIndex: -1,
          position: "absolute"
        }}
      ></div>
      <div className="ui container" style={{ width: "70% " }}>
        <Header />
        <Switch>
          <Route path="/recipes" exact component={RecipeList} />
          <Route path="/" exact component={RecipeList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/recipes/new" exact component={CreateRecipe} />
          <Route path="/recipes/:id" exact component={ShowRecipe} />
          <Route path="/user/:id" exact component={ShowUser} />
          <Route path="/followers/:id" exact component={ShowFollowers} />
          <Route path="/followings/:id" exact component={ShowFollowings} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
