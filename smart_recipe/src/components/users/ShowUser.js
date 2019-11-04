import React from "react";
import { connect } from "react-redux";
import {
  fetchUserRecipes,
  fetchUser,
  followUser,
  unfollowUser,
  fetchFollows
} from "../../actions";
import Spinner from "../Spinner";
import RecipeList from "../recipes/RecipeList";

class ShowUser extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchUserRecipes(id);
    this.props.fetchUser(id);
    this.props.fetchFollows(this.props.signedInUser);
  }

  onFollowClick = () => {
    this.props.followUser(this.props.signedInUser, this.props.match.params.id);
  };

  onUnfollowClick = () => {
    this.props.unfollowUser(
      this.props.signedInUser,
      this.props.match.params.id
    );
  };

  renderPicture = () => {
    if (!this.props.currentUser.profilepicture) {
      return (
        <React.Fragment>
          <img
            className="ui left floated image"
            src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
            alt="placeholder"
            style={{
              width: 200,
              height: 200,
              borderRadius: 200 / 2
            }}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <img
          className="ui left floated image"
          src={this.props.currentUser.profilepicture}
          alt={this.props.currentUser.id}
          style={{
            width: 200,
            height: 200,
            borderRadius: 200 / 2
          }}
        />
      </React.Fragment>
    );
  };

  renderFollowButton() {
    //check if already following
    if (
      !this.props.signedInUser ||
      this.props.signedInUser === parseInt(this.props.match.params.id)
    ) {
      return null;
    } else if (this.props.follows) {
      if (
        this.props.follows.some(
          follow => follow.followedId === parseInt(this.props.match.params.id)
        )
      ) {
        return (
          <div
            className="ui right labeled button"
            style={{ position: "absolute", bottom: 20, width: 300 }}
          >
            <button
              className="ui green button"
              style={{ width: 280 }}
              onClick={this.onUnfollowClick}
            >
              <i aria-hidden="true" className="check icon"></i>
              Following
            </button>
          </div>
        );
      }
    }

    return (
      <div
        className="ui right labeled button"
        style={{ position: "absolute", bottom: 20, width: 300 }}
      >
        <button
          className="ui blue button"
          style={{ width: 280 }}
          onClick={this.onFollowClick}
        >
          <i aria-hidden="true" className="plus icon"></i>
          Follow
        </button>
      </div>
    );
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return (
      <div>
        <div className="ui grid">
          <div className="three wide column">{this.renderPicture()}</div>
          <div className="eight wide left aligned column">
            <h2>{this.props.currentUser.username}</h2>
            <div
              className="ui small statistics"
              style={{ position: "absolute", bottom: 75 }}
            >
              <div className="ui statistic">
                <div className="value">{this.props.userRecipes.length}</div>
                <div className="label">Recipes</div>
              </div>
              <div className="ui statistic">
                <div className="value">24</div>
                <div className="label">Following</div>
              </div>
              <div className="ui statistic">
                <div className="value">5</div>
                <div className="label">Follower</div>
              </div>
            </div>
            {this.renderFollowButton()}
          </div>
        </div>
        <br />
        <RecipeList
          userRecipes={this.props.userRecipes}
          title={`Recipes by ${this.props.currentUser.username}`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    currentUser: state.users.find(user => user.id === parseInt(id)),
    userRecipes: state.userRecipes,
    signedInUser: state.auth.userId,
    follows: state.follows
  };
};

export default connect(
  mapStateToProps,
  { fetchUserRecipes, fetchUser, followUser, unfollowUser, fetchFollows }
)(ShowUser);
