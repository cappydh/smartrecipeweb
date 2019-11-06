import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions";

class Logout extends React.Component {
  render() {
    return (
      <Link
        onClick={() => this.props.logoutUser()}
        to="/"
        className="item link"
      >
        Logout
      </Link>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Logout);
