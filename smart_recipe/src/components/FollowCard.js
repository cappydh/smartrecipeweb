import React from "react";
import { connect } from "react-redux";
import { fetchFollowers, fetchFollowings } from "../actions";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

class FollowCard extends React.Component {
  componentDidMount() {
    if (this.props.followingId !== undefined) {
      this.props.fetchFollowings(this.props.followingId);
    } else if (this.props.followedId !== undefined) {
      this.props.fetchFollowers(this.props.followedId);
    }
  }

  renderFollowers() {
    if (this.props.follows.length > 0) {
      return this.props.follows.map(follow => {
        return (
          <div className="ui divided middle aligned list" key={follow.id}>
            <div className="item">
              <div className="right floated content">
                <FollowButton
                  followerId={follow.followerId}
                  followedId={follow.followedId}
                  buttonWidth="200px"
                />
              </div>
              <img
                className="ui avatar image"
                src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
                alt="avatar"
              />
              <div className="content">{follow.followerId}</div>
            </div>
          </div>
        );
      });
    }
    return null;
  }

  renderFollowings() {
    if (this.props.follows.length > 0) {
      return this.props.follows.map(follow => {
        return (
          <div className="ui divided middle aligned list" key={follow.id}>
            <div className="item">
              <div className="right floated content">
                <FollowButton
                  followerId={follow.followerId}
                  followedId={follow.followedId}
                  buttonWidth="200px"
                />
              </div>
              <img
                className="ui avatar image"
                src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
                alt="avatar"
              />
              <div className="content">{follow.followedId}</div>
            </div>
          </div>
        );
      });
    }
    return null;
  }

  render() {
    console.log(this.props);
    if (this.props.followingId !== undefined) {
      return this.renderFollowings();
    } else if (this.props.followedId !== undefined) {
      return this.renderFollowers();
    }
  }
}

const mapStateToProps = state => {
  return {
    follows: Object.values(state.followerModal),
    users: Object.values(state.users)
  };
};

export default connect(
  mapStateToProps,
  { fetchFollowings, fetchFollowers }
)(FollowCard);
