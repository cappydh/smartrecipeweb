import React from "react";
import { connect } from "react-redux";
import { fetchUserRecipes, fetchUser } from "../../actions";
import Spinner from "../Spinner";
import RecipeList from "../recipes/RecipeList";

class ShowUser extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchUserRecipes(id);
    this.props.fetchUser(id);
  }

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
            <h2>
              {this.props.currentUser.firstname}{" "}
              {this.props.currentUser.lastname}
            </h2>
            <span className="date">Joined Date</span>
            <div
              className="ui small statistics"
              style={{ position: "absolute", bottom: 50 }}
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
          </div>
        </div>
        <br />
        <RecipeList
          userRecipes={this.props.userRecipes}
          title={`Recipes by ${this.props.currentUser.firstname} ${this.props.currentUser.lastname}`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    currentUser: state.users.find(user => user.id === parseInt(id)),
    userRecipes: state.userRecipes
  };
};

export default connect(
  mapStateToProps,
  { fetchUserRecipes, fetchUser }
)(ShowUser);
