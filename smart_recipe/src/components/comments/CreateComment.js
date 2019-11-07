import React from "react";
import { connect } from "react-redux";
import { createComment } from "../../actions";

class CreateComment extends React.Component {
  state = { comment: "" };

  handleCommentChange = event => {
    this.setState({
      comment: event.target.value
    });
  };

  handleCreateComment = event => {
    const { commentedRecipe, currentUser } = this.props;
    event.preventDefault();
    this.props.createComment(
      this.state.comment,
      commentedRecipe,
      currentUser,
      new Date().toLocaleString()
    );
  };

  render() {
    if (this.props.currentUser) {
      return (
        <form className="ui reply form">
          <div className="field">
            <textarea
              type="textinput"
              name="comment"
              placeholder="Write a comment here..."
              value={this.state.comment}
              onChange={this.handleCommentChange}
            />
          </div>
          <button
            className="ui icon primary left labeled button"
            onClick={this.handleCreateComment}
          >
            <i aria-hidden="true" className="edit icon" />
            Add Comment
          </button>
        </form>
      );
    }
    return <div>Login to add comment</div>;
  }
}

const mapStateToProps = state => {
  return { currentUser: state.auth.userId };
};

export default connect(
  mapStateToProps,
  { createComment }
)(CreateComment);
