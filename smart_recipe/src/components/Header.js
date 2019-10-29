import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./users/Logout";

const renderSignInButton = signInStatus => {
  if (signInStatus) {
    return <Logout />;
  } else {
    return (
      <Link to="/login" className="item">
        Login
      </Link>
    );
  }
};

const Header = () => {
  const isSignedIn = useSelector(state => state.users.isSignedIn);
  const renderButton = renderSignInButton(isSignedIn);

  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        SmartRecipe
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          HomePage
        </Link>
        <Link to="/recipes" className="item">
          Recipes
        </Link>
        {renderButton}
      </div>
    </div>
  );
};

export default Header;
