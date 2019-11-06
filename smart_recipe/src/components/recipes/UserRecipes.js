import React from "react";
import { Link } from "react-router-dom";
import UserCardHeader from "./UserCardHeader";

class UserRecipes extends React.Component {
  renderList() {
    return this.props.userRecipes.map(recipe => {
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
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div className="ui cards">{this.renderList()}</div>
      </div>
    );
  }
}

export default UserRecipes;
