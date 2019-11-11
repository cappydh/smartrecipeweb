import React from "react";
import { connect } from "react-redux";
import { fetchRecipe, createRating, fetchRatings } from "../../actions";
import UserCard from "./UserCard";
import Spinner from "../Spinner";
import CommentSection from "../comments/CommentSection";
import BeautyStars from "beauty-stars";

class ShowRecipe extends React.Component {
  state = {
    value: 0,
    editable: true,
    overallRating: 0,
    ratingCounter: 0,
    totalRatings: 0
  };
  componentDidMount = async () => {
    const { id } = this.props.match.params;

    await this.props.fetchRecipe(id);

    await this.props.fetchRatings(id);

    const rating = this.props.ratings.find(
      rating =>
        rating.createdBy === this.props.currentUser &&
        rating.recipeId === parseInt(id)
    );

    var totalRatingValue = 0;

    const overallRating = this.props.ratings.filter(
      rating => rating.recipeId === parseInt(id)
    );

    if (overallRating.length > 0) {
      this.setState({ ratingCounter: overallRating.length });

      overallRating.map(rating => (totalRatingValue += rating.ratingValue));

      this.setState({ totalRatings: totalRatingValue });

      this.setState({
        overallRating: totalRatingValue / this.state.ratingCounter
      });
    }

    if (rating) {
      this.setState({ value: rating.ratingValue, editable: false });
    }
  };

  renderRating = async (value, currentUser, recipeId) => {
    await this.setState({
      value: value,
      editable: false,
      overallRating:
        (this.state.totalRatings + value) / (this.state.ratingCounter + 1)
    });

    this.props.createRating(value, currentUser, recipeId);
  };

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
              {`Overall Rating: (${this.state.overallRating.toFixed(1)})`}
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
