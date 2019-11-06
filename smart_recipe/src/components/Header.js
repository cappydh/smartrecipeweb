import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./users/Logout";
import SearchBar from "./SearchBar";

import "./Header.css";

const renderSignInButton = signInStatus => {
  if (signInStatus) {
    return <Logout />;
  } else {
    return (
      <Link to="/login" className="item link">
        Login
      </Link>
    );
  }
};

const Header = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const renderButton = renderSignInButton(isSignedIn);

  return (
    <div
      className="ui secondary large menu"
      style={{ backgroundColor: "rgb(	171, 0, 18)" }}
    >
      <Link to="/" className="top aligned item link">
        SmartRecipe
      </Link>
      <div className="right menu">
        <div className="item link">
          <SearchBar />
        </div>
        <Link to="/recipes" className="item link">
          Recipes
        </Link>
        {renderButton}
      </div>
    </div>
  );
};

export default Header;
