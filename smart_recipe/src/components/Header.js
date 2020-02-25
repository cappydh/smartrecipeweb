import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./users/Logout";
import SearchBar from "./SearchBar";
import { Dropdown } from "semantic-ui-react";
import UserFeed from "./UserFeed";

import "../styles/Header.css";

const renderSignInButton = (signInStatus, currentUser) => {
  if (signInStatus && currentUser) {
    return (
      <React.Fragment>
        <Dropdown text="My Feed" className="item link">
          <Dropdown.Menu>
            <UserFeed currentUser={currentUser.id} />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown text={currentUser.username} className="item link">
          <Dropdown.Menu>
            <Link to={`/user/${currentUser.id}`} className="myProfile">
              <Dropdown.Item>My Profile</Dropdown.Item>
            </Link>
            <Dropdown.Item>
              <Logout />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
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
  const currentUserId = useSelector(state => state.auth.userId);
  const users = useSelector(state => Object.values(state.users));
  const currentUser = users.find(user => user.id === currentUserId);
  const renderButton = renderSignInButton(isSignedIn, currentUser);

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
