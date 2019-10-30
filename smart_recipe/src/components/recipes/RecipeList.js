import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRecipes, fetchRecipesAndUsers } from "../../actions";
import UserCardHeader from "./UserCardHeader";

class RecipeList extends React.Component {
  componentDidMount() {
    this.props.fetchRecipes();
    this.props.fetchRecipesAndUsers();
  }

  renderList() {
    if (this.props.recipes.length !== 0) {
      return this.props.recipes.map(recipe => {
        return (
          <div className="ui card" key={recipe.id}>
            <img
              src={recipe.attachment}
              alt={recipe.id}
              className="image"
              height="290"
            />
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
              {this.renderAdmin(recipe)}
              <UserCardHeader userId={recipe.userId} />
            </div>
          </div>
        );
      });
    }
  }

  renderAdmin(recipe) {
    if (recipe.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/recipes/edit/${recipe.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/recipes/delete/${recipe.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <Link to="/recipes/new" className="ui button primary">
            Create Recipe
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Recipes</h2>
        <div className="ui cards">{this.renderList()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}
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
