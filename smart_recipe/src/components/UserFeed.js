import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchFollowers } from "../redux/actions/followActions";
import { fetchComments } from "../redux/actions/commentActions";
import { fetchUserRecipes } from "../redux/actions/recipeActions";
import Spinner from "./Spinner";

import "../styles/UserFeed.css";

class UserFeed extends React.Component {
  state = { commentCounter: 0, followCounter: 0 };

  componentDidMount = async () => {
    await this.props.fetchFollowers(this.props.currentUser);
    await this.props.fetchUserRecipes(this.props.currentUser);

    const userRecipes = this.props.userRecipes.filter(
      recipe => recipe.userId === this.props.currentUser
    );

    await userRecipes.map(recipe => {
      this.props.fetchComments(recipe.id);
      return null;
    });

    this.setState({ followCounter: this.props.follows.length });
    console.log(this.props.comments);
  };

  renderUserAvatar(user) {
    if (!user.profilepicture) {
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
          alt="avatar"
          style={{
            width: 35,
            height: 35,
            borderRadius: 35 / 2
          }}
        />
      );
    }
    return (
      <img
        src={user.profilepicture}
        alt="avatar"
        style={{
          width: 35,
          height: 35,
          borderRadius: 35 / 2
        }}
      />
    );
  }

  renderFollows(user) {
    return (
      <div className="event">
        <div className="label">
          <Link to={`/user/${user.id}`}>{this.renderUserAvatar(user)}</Link>
        </div>
        <div className="content">
          <div className="date">1 day ago</div>
          <div className="summary">
            <Link to={`/user/${user.id}`}>{user.username}</Link> followed you
          </div>
        </div>
      </div>
    );
  }

  renderComments(user, comment) {
    const recipe = this.props.userRecipes.find(
      recipe => recipe.id === comment.recipeId
    );
    if (recipe) {
      return (
        <div className="event" style={{ whiteSpace: "normal !important" }}>
          <div className="label">
            <Link to={`/user/${user.id}`}>{this.renderUserAvatar(user)}</Link>
          </div>
          <div className="content">
            <div className="date">{comment.createdDt.split(" ")[0]}</div>
            <div className="summary">
              <Link to={`/user/${user.id}`}>{user.username}</Link> commented on
              your recipe{" "}
              <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>!
            </div>
          </div>
        </div>
      );
    }
  }

  renderUserFeedComment() {
    if (this.props.comments.length > 0) {
      return this.props.comments.map(comment => {
        const user = this.props.users.find(
          user =>
            user.id === comment.createdBy && user.id !== this.props.currentUser
        );
        if (user) {
          return (
            <React.Fragment key={comment.id}>
              {this.renderComments(user, comment)}
            </React.Fragment>
          );
        }
        return <Spinner key={comment.id} />;
      });
    }
  }

  renderUserFeedFollow() {
    if (this.props.follows.length > 0) {
      return this.props.follows.map(follow => {
        const user = this.props.users.find(
          user => user.id === follow.followerId
        );
        if (user) {
          return (
            <React.Fragment key={follow.id}>
              {" "}
              {this.renderFollows(user)}
            </React.Fragment>
          );
        }
        return <Spinner key={follow.id} />;
      });
    }
  }

  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">Activity</div>
        </div>
        <div className="content">
          <div className="ui feed">
            {this.renderUserFeedFollow()} {this.renderUserFeedComment()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    follows: Object.values(state.followerModal),
    users: Object.values(state.users),
    userRecipes: Object.values(state.userRecipes),
    currentUser: state.auth.userId,
    comments: Object.values(state.comments)
  };
};

export default connect(mapStateToProps, {
  fetchFollowers,
  fetchComments,
  fetchUserRecipes
})(UserFeed);
