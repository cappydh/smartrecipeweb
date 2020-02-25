import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";

import "../../styles/Logout.css";

class Logout extends React.Component {
  render() {
    return (
      <Link onClick={() => this.props.logoutUser()} to="/" className="logout">
        Logout
      </Link>
    );
  }
}

export default connect(null, { logoutUser })(Logout);
