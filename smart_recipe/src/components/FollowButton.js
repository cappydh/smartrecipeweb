import React from "react";
import { connect } from "react-redux";
import { followUser, unfollowUser, isFollowing } from "../actions";

class FollowButton extends React.Component {
  componentDidMount() {
    this.props.isFollowing(this.props.followerId, this.props.followedId);
  }

  onFollowClick = () => {
    this.props.followUser(this.props.followerId, this.props.followedId);
  };

  onUnfollowClick = () => {
    this.props.unfollowUser(this.props.followerId, this.props.followedId);
  };

  render() {
    if (
      !this.props.followerId ||
      this.props.followerId === this.props.followedId
    ) {
      return null;
    } else if (this.props.isUserFollowing) {
      return (
        <React.Fragment>
          <button
            className="ui green button"
            style={{
              width: this.props.buttonWidth,
              position: "absolute",
              bottom: 20
            }}
            onClick={this.onUnfollowClick}
          >
            <i aria-hidden="true" className="check icon"></i>
            Following
          </button>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <button
          className="ui blue button"
          style={{
            width: this.props.buttonWidth,
            position: "absolute",
            bottom: 20
          }}
          onClick={this.onFollowClick}
        >
          <i aria-hidden="true" className="plus icon"></i>
          Follow
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserFollowing: state.follows.isFollowing,
    signedInUser: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { isFollowing, followUser, unfollowUser }
)(FollowButton);
