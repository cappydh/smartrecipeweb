import React from "react";
import { connect } from "react-redux";

class UserCardHeader extends React.Component {
  render() {
    const { user } = this.props;
    console.log(this.props);

    if (!user) {
      return null;
    }

    return (
      <div>
        <i className="user icon" />
        {user[0].username}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user[0].id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserCardHeader);
