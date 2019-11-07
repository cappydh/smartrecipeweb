import React from "react";
import { connect } from "react-redux";
import { fetchRecipe } from "../../actions";
import UserCard from "./UserCard";
import Spinner from "../Spinner";
import CommentSection from "../comments/CommentSection";

class ShowRecipe extends React.Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.id);
  }

  render() {
    if (!this.props.recipe) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    const {
      name,
      description,
      attachment,
      recipeType,
      notes,
      userId,
      id
    } = this.props.recipe;

    return (
      <React.Fragment>
        <div className="ui grid">
          <div className="four wide column">
            <img src={attachment} alt={id} className="ui image" />
          </div>
          <div className="eight wide column">
            <h1>{name}</h1>
            <h3>
              {description} ({recipeType})
            </h3>
            <span>{notes}</span>
          </div>
          <div className="four wide column">
            <UserCard userId={userId} />
          </div>
        </div>
        <CommentSection commentedRecipe={id} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: state.recipes[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchRecipe }
)(ShowRecipe);
