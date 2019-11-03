import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserCardHeader extends React.Component {
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <div>
        <i className="user icon" />
        <Link to={`/user/${user.id}`}>{user.username} </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserCardHeader);
