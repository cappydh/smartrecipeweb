import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FollowButton from "../FollowButton";
import {
  fetchUser,
  followUser,
  unfollowUser,
  fetchFollows,
  isFollowing
} from "../../actions";

class UserCard extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.userId);
    this.props.fetchFollows(this.props.signedInUser);
    this.props.isFollowing(this.props.signedInUser, this.props.userId);
  }

  renderUserPicture() {
    if (!this.props.user.profilepicture) {
      return (
        <React.Fragment>
          <img
            className="ui tiny left floated image"
            src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
            alt="placeholder"
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2
            }}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <img
          className="ui tiny left floated image"
          src={this.props.user.profilepicture}
          alt={this.props.user.id}
          style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
        />
      </React.Fragment>
    );
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }
    return (
      <div className="ui card">
        <div className="content">
          {this.renderUserPicture()}
          <Link to={`/user/${user.id}`} className="header">
            <div className="header">
              {user.firstname} {user.lastname}
            </div>
          </Link>

          <div className="meta">23.10.2019</div>
          <div className="description">Description will be here</div>
        </div>
        <div className="extra content">
          <FollowButton
            followerId={this.props.signedInUser}
            followedId={user.id}
            buttonWidth="250px"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user => user.id === ownProps.userId),
    signedInUser: state.auth.userId,
    follows: state.follows,
    isUserFollowing: state.follows.isFollowing
  };
};

export default connect(
  mapStateToProps,
  { fetchUser, followUser, unfollowUser, fetchFollows, isFollowing }
)(UserCard);
