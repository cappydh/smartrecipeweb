import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComments, fetchUser } from "../../actions";
import Spinner from "../Spinner";

class ShowComment extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchComments(this.props.recipeId);

    const uniqueUsers = [];

    await this.props.comments.map(comment => {
      if (uniqueUsers.indexOf(comment.createdBy) === -1) {
        uniqueUsers.push(comment.createdBy);
        this.props.fetchUser(comment.createdBy);
      }
      return null;
    });
  };

  renderComments() {
    const comments = this.props.comments.filter(
      comment => comment.recipeId === this.props.recipeId
    );
    return comments.map(comment => {
      const user = this.props.commentOwners.find(
        owner => owner.id === comment.createdBy
      );
      if (user) {
        return (
          <div className="comment" key={comment.id}>
            <div className="avatar">
              <img src={user.profilepicture} alt="avatar" />
            </div>
            <div className="content">
              <Link to={`/user/${comment.createdBy}`} className="author">
                {user.username}
              </Link>
              <div className="metadata">
                <div>{comment.createdDt}</div>
              </div>
              <div className="text">{comment.comment}</div>
              <div className="actions">
                <Link to="/" className="">
                  Reply
                </Link>
              </div>
            </div>
          </div>
        );
      }
      return <Spinner />;
    });
  }

  render() {
    if (
      this.props.commentOwners !== undefined &&
      this.props.commentOwners.length > 0
    ) {
      return this.renderComments();
    }
    return <Spinner />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: Object.values(state.comments),
    commentOwners: Object.values(state.users)
  };
};

export default connect(
  mapStateToProps,
  { fetchComments, fetchUser }
)(ShowComment);
