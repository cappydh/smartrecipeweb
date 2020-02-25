import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../../redux/actions/userActions";
import { fetchUserRecipes } from "../../redux/actions/recipeActions";
import { fetchFollows, followNumbers } from "../../redux/actions/followActions";
import Spinner from "../Spinner";
import UserRecipes from "../recipes/UserRecipes";
import FollowButton from "../FollowButton";
import "../../styles/ShowUser.css";

class ShowUser extends React.Component {
  state = { isLoading: true, currentUser: "" };
  componentDidMount = async () => {
    const { id } = this.props.match.params;
    await this.props.fetchUserRecipes(id);
    await this.props.fetchUser(id);
    await this.props.followNumbers(id);
    this.setState({
      isLoading: false,
      currentUser: this.props.currentUser.find(user => user.id === parseInt(id))
    });
  };

  renderPicture = () => {
    if (!this.state.currentUser.profilepicture) {
      return (
        <React.Fragment>
          <img
            className="ui left floated image"
            src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
            alt="placeholder"
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2
            }}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <img
          className="ui left floated image"
          src={this.state.currentUser.profilepicture}
          alt={this.state.currentUser.id}
          style={{
            width: 150,
            height: 150,
            borderRadius: 150 / 2
          }}
        />
      </React.Fragment>
    );
  };

  onFollowClick = () => {
    const { id } = this.props.match.params;
    this.props.followNumbers(id);
  };

  render() {
    if (!this.state.isLoading) {
      if (!this.state.currentUser) {
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
              <h2>{this.state.currentUser.username}</h2>
              <div
                className="ui tiny statistics"
                style={{ position: "absolute", bottom: 75 }}
              >
                <div className="ui statistic">
                  <div className="value">
                    {
                      this.props.userRecipes.filter(
                        recipe => recipe.userId === this.state.currentUser.id
                      ).length
                    }
                  </div>
                  <div className="label">Recipes</div>
                </div>
                <div className="ui statistic">
                  <div className="value">
                    <Link
                      to={`/followings/${this.state.currentUser.id}`}
                      className="followLink"
                    >
                      {this.props.following}
                    </Link>
                  </div>
                  <div className="label">Following</div>
                </div>
                <div className="ui statistic">
                  <div className="value">
                    <Link
                      to={`/followers/${this.state.currentUser.id}`}
                      className="followLink"
                    >
                      {this.props.follower}
                    </Link>
                  </div>
                  <div className="label">Follower</div>
                </div>
              </div>
              <FollowButton
                followerId={this.props.signedInUser}
                followedId={this.state.currentUser.id}
                buttonWidth="300px"
                onClick={() => {
                  this.onFollowClick();
                }}
                positionValue="absolute"
                bottomValue="20px"
              />
            </div>
          </div>
          <br />
          <UserRecipes
            userRecipes={this.props.userRecipes.filter(
              recipe => recipe.userId === this.state.currentUser.id
            )}
            title={`Recipes by ${this.state.currentUser.username}`}
          />
        </div>
      );
    }
    return <Spinner />;
  }
}

const mapStateToProps = state => {
  return {
    currentUser: Object.values(state.users),
    userRecipes: Object.values(state.userRecipes),
    signedInUser: state.auth.userId,
    follows: state.follows,
    follower: state.followNumbers.followerNumber,
    following: state.followNumbers.followingNumber
  };
};

export default connect(mapStateToProps, {
  fetchUserRecipes,
  fetchUser,
  fetchFollows,
  followNumbers
})(ShowUser);
