import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRecipes, fetchRecipesAndUsers } from "../../actions";
import UserCardHeader from "./UserCardHeader";
import Spinner from "../Spinner";

class RecipeList extends React.Component {
  state = { isLoading: true };
  componentDidMount = async () => {
    await this.props.fetchRecipesAndUsers();
    this.setState({ isLoading: false });
  };

  renderList() {
    return this.props.recipes.map(recipe => {
      return (
        <div className="ui card" key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`} className="image">
            <img
              src={recipe.attachment}
              alt={recipe.id}
              className="image"
              style={{ height: "259px" }}
            />
          </Link>
          <div className="content">
            <Link to={`/recipes/${recipe.id}`} className="header">
              {recipe.name}
            </Link>
            <div className="meta">
              <span className="date">{recipe.recipeType}</span>
            </div>
            <div className="description">{recipe.description}</div>
          </div>
          <div className="extra content">
            <UserCardHeader userId={recipe.userId} />
          </div>
        </div>
      );
    });
  }

  renderCreateButton() {
    if (this.props.isSignedIn && !this.props.userRecipes) {
      return (
        <div
          style={{
            textAlign: "right",
            marginBottom: "30px",
            marginTop: "-45px"
          }}
        >
          <Link
            to="/recipes/new"
            className="ui button"
            style={{ backgroundColor: "orange", color: "white" }}
          >
            Create Recipe
          </Link>
        </div>
      );
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div>
          <h2>{this.props.title}</h2>
          {this.renderCreateButton()}
          <div className="ui cards">{this.renderList()}</div>
        </div>
      );
    }
    return <Spinner />;
  }
}

RecipeList.defaultProps = {
  title: "Recipes"
};

const mapStateToProps = state => {
  return {
    recipes: Object.values(state.recipes),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchRecipes, fetchRecipesAndUsers }
)(RecipeList);
