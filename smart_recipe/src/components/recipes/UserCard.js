import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";

class UserCard extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }
    return (
      <div className="ui card">
        <div className="image">
          <img />
          <div className="content">
            <div className="header">
              {user[0].firstname} {user[0].lastname}
            </div>
            <div className="meta">Joined Date</div>
            <div className="description">Description will be here</div>
          </div>
          <div className="extra content">
            <i className="user icon"></i>
            xx Followers
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user[0].id === ownProps.userId) };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(UserCard);
