import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRecipes } from "../../actions";

class RecipeList extends React.Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  renderList() {
    if (this.props.recipes.length !== 0) {
      return this.props.recipes.map(recipe => {
        return (
          <div className="item" key={recipe.id}>
            {this.renderAdmin(recipe)}
            <i className="large middle aligned icon camera" />
            <div className="content">
              <Link to={`/streams/${recipe.id}`} className="header">
                {recipe.name}
              </Link>
              <div className="description">{recipe.description}</div>
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
        <div style={{ textAlign: "right" }}>
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
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    recipes: Object.values(state.recipes),
    currentUserId: state.users.userId,
    isSignedIn: state.users.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchRecipes }
)(RecipeList);
