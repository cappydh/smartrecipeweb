import React from "react";
import { connect } from "react-redux";
import {
  followUser,
  unfollowUser,
  isFollowing,
  fetchFollows
} from "../actions";

class FollowButton extends React.Component {
  componentDidMount() {
    this.props.isFollowing(this.props.followerId, this.props.followedId);
    this.props.fetchFollows(this.props.signedInUser);
  }

  onFollowClick = async () => {
    await this.props.followUser(this.props.followerId, this.props.followedId);
    this.props.fetchFollows(this.props.signedInUser);
    this.props.onClick();
  };

  onUnfollowClick = async () => {
    await this.props.unfollowUser(this.props.followerId, this.props.followedId);
    this.props.fetchFollows(this.props.signedInUser);
    this.props.onClick();
  };

  isFollowing(followedId) {
    const isFollowing = this.props.follows.find(
      follow =>
        follow.followerId === this.props.signedInUser &&
        follow.followedId === followedId
    );
    return isFollowing;
  }

  render() {
    if (
      !this.props.followerId ||
      this.props.followerId === this.props.followedId
    ) {
      return null;
    } else if (this.isFollowing(this.props.followedId)) {
      return (
        <button
          className="ui green button"
          style={{
            width: this.props.buttonWidth,
            position: this.props.positionValue,
            bottom: this.props.bottomValue
          }}
          onClick={this.onUnfollowClick}
        >
          <i aria-hidden="true" className="check icon"></i>
          Following
        </button>
      );
    }
    return (
      <button
        className="ui blue button"
        style={{
          width: this.props.buttonWidth,
          position: this.props.positionValue,
          bottom: this.props.bottomValue
        }}
        onClick={this.onFollowClick}
      >
        <i aria-hidden="true" className="plus icon"></i>
        Follow
      </button>
    );
  }
}

FollowButton.defaultProps = {
  onClick: () => {},
  position: "",
  bottom: ""
};

const mapStateToProps = state => {
  return {
    signedInUser: state.auth.userId,
    follows: Object.values(state.follows)
  };
};

export default connect(
  mapStateToProps,
  { isFollowing, followUser, unfollowUser, fetchFollows }
)(FollowButton);
