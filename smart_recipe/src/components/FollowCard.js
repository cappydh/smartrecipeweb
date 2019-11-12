import React from "react";
import { connect } from "react-redux";
import { fetchFollowers, fetchFollowings } from "../actions";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import Spinner from "./Spinner";
import "./FollowCard.css";

class FollowCard extends React.Component {
  componentDidMount() {
    if (this.props.followingId !== undefined) {
      this.props.fetchFollowings(this.props.followingId);
    } else if (this.props.followedId !== undefined) {
      this.props.fetchFollowers(this.props.followedId);
    }
  }

  onFollowClick = async () => {};

  renderUserAvatar(user) {
    if (user.profilepicture) {
      return (
        <React.Fragment>
          <img
            className="ui avatar image"
            src={user.profilepicture}
            alt="avatar"
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <img
          className="ui avatar image"
          src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
          alt="avatar"
        />
      </React.Fragment>
    );
  }

  renderFollowers() {
    if (this.props.follows.length > 0) {
      const filteredFollows = this.props.follows.filter(
        follow => follow.followedId === parseInt(this.props.followedId)
      );
      return filteredFollows.map(follow => {
        const user = this.props.users.find(
          user => user.id === follow.followerId
        );
        if (user) {
          return (
            <div className="ui divided middle aligned list" key={follow.id}>
              <div className="item">
                <div className="right floated content">
                  <FollowButton
                    followerId={this.props.signedInUser}
                    followedId={follow.followerId}
                    onClick={() => {
                      this.onFollowClick();
                    }}
                    buttonWidth="200px"
                  />
                </div>
                <div className="content">
                  <Link className="linkToUser" to={`/user/${user.id}`}>
                    {this.renderUserAvatar(user)}

                    {user.username}
                  </Link>
                </div>
              </div>
            </div>
          );
        }
        return <Spinner key={follow.id} />;
      });
    }
    return null;
  }

  renderFollowings() {
    if (this.props.follows.length > 0) {
      const filteredFollows = this.props.follows.filter(
        follow => follow.followerId === parseInt(this.props.followingId)
      );
      return filteredFollows.map(follow => {
        const user = this.props.users.find(
          user => user.id === follow.followedId
        );
        if (user) {
          return (
            <div className="ui divided middle aligned list" key={follow.id}>
              <div className="item">
                <div className="right floated content">
                  <FollowButton
                    followerId={this.props.signedInUser}
                    followedId={follow.followedId}
                    onClick={() => {
                      this.onFollowClick();
                    }}
                    buttonWidth="200px"
                  />
                </div>

                <div className="content">
                  <Link className="linkToUser" to={`/user/${user.id}`}>
                    {this.renderUserAvatar(user)}

                    {user.username}
                  </Link>
                </div>
              </div>
            </div>
          );
        }
        return <Spinner key={follow.id} />;
      });
    }
    return null;
  }

  render() {
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
    users: Object.values(state.users),
    signedInUser: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchFollowings, fetchFollowers }
)(FollowCard);
