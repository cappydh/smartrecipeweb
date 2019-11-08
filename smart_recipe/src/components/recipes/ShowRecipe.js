import React from "react";
import { connect } from "react-redux";
import { fetchRecipe, createRating, fetchRatings } from "../../actions";
import UserCard from "./UserCard";
import Spinner from "../Spinner";
import CommentSection from "../comments/CommentSection";
import BeautyStars from "beauty-stars";

class ShowRecipe extends React.Component {
  state = { value: 0, editable: true, overallRating: 0 };
  componentDidMount = async () => {
    await this.props.fetchRecipe(this.props.match.params.id);

    await this.props.fetchRatings(this.props.match.params.id);

    const rating = this.props.ratings.find(
      rating =>
        rating.createdBy === this.props.currentUser &&
        rating.recipeId === parseInt(this.props.match.params.id)
    );

    var overallRatingValue = 0;

    const overallRating = this.props.ratings.filter(
      rating => rating.recipeId === parseInt(this.props.match.params.id)
    );

    if (overallRating.length > 0) {
      overallRating.map(rating => (overallRatingValue += rating.ratingValue));

      this.setState({
        overallRating: overallRatingValue / overallRating.length
      });
    }

    if (rating) {
      this.setState({ value: rating.ratingValue, editable: false });
    }
  };

  renderRating(value, currentUser, recipeId) {
    this.setState({ value, editable: false });
    this.props.createRating(value, currentUser, recipeId);
  }

  renderRatingStars() {
    return (
      <BeautyStars
        value={this.state.value}
        onChange={value =>
          this.renderRating(value, this.props.currentUser, this.props.recipe.id)
        }
        size="20px"
        inactiveColor="grey"
        activeColor="orange"
        editable={this.state.editable}
      />
    );
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
            <div>{this.renderRatingStars()}</div>
            <div style={{ marginTop: "10px", fontSize: 15 }}>
              {`Overall Rating: (${this.state.overallRating})`}
            </div>
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
        <div />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: state.recipes[ownProps.match.params.id],
    currentUser: state.auth.userId,
    ratings: Object.values(state.ratings)
  };
};

export default connect(
  mapStateToProps,
  { fetchRecipe, createRating, fetchRatings }
)(ShowRecipe);
