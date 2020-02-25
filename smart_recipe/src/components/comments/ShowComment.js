import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComments } from "../../redux/actions/commentActions";
import { fetchUser } from "../../redux/actions/userActions";
import Spinner from "../Spinner";
import CreateComment from "./CreateComment";

class ShowComment extends React.Component {
  state = { parentComment: null, replyingTo: "Write a comment here..." };

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

  replyButtonHandler = async (parentComment, replyingTo) => {
    await this.setState({
      replyingTo: "You are replying to @" + replyingTo,
      parentComment: parentComment
    });
    this.nameInput.focus();
  };

  renderUserAvatar(user) {
    if (user.profilepicture) {
      return (
        <div className="avatar">
          <img src={user.profilepicture} alt="avatar" />
        </div>
      );
    }
    return (
      <div className="avatar">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
          alt="avatar"
        />
      </div>
    );
  }

  renderChildComments(parentCommentId) {
    const childcomments = this.props.comments.filter(
      comment => comment.parentComment === parentCommentId
    );

    return childcomments.map(childComment => {
      const user = this.props.commentOwners.find(
        owner => owner.id === childComment.createdBy
      );
      if (user && childComment) {
        return (
          <div className="ui comments" key={childComment.id}>
            <div className="comment">
              {this.renderUserAvatar({ user })}
              <div className="content">
                <Link to={`/user/${childComment.createdBy}`} className="author">
                  {user.username}
                </Link>
                <div className="metadata">
                  <div>{childComment.createdDt}</div>
                </div>
                <div className="text">{childComment.comment}</div>
                <div className="actions">
                  <button
                    className="ui mini basic button"
                    onClick={() =>
                      this.replyButtonHandler(parentCommentId, user.username)
                    }
                    value={childComment.id}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return null;
    });
  }

  renderComments() {
    const comments = this.props.comments.filter(
      comment =>
        comment.recipeId === this.props.recipeId && !comment.parentComment
    );
    return comments.map(comment => {
      const user = this.props.commentOwners.find(
        owner => owner.id === comment.createdBy
      );
      if (user) {
        return (
          <div className="comment" key={comment.id}>
            {this.renderUserAvatar(user)}
            <div className="content">
              <Link to={`/user/${comment.createdBy}`} className="author">
                {user.username}
              </Link>
              <div className="metadata">
                <div>{comment.createdDt}</div>
              </div>
              <div className="text">{comment.comment}</div>
              <div className="actions">
                <button
                  className="ui mini basic button"
                  onClick={() =>
                    this.replyButtonHandler(comment.id, user.username)
                  }
                  value={comment.id}
                >
                  Reply
                </button>
              </div>
            </div>
            {this.renderChildComments(comment.id)}
          </div>
        );
      }
      return <Spinner key={`Spinner${comment.id}`} />;
    });
  }

  render() {
    if (
      this.props.commentOwners !== undefined &&
      this.props.commentOwners.length > 0 &&
      this.props.isSignedIn
    ) {
      return (
        <React.Fragment>
          {this.renderComments()}
          <CreateComment
            commentedRecipe={this.props.recipeId}
            commentText={this.state.replyingTo}
            parentComment={this.state.parentComment}
            refInput={input => {
              this.nameInput = input;
            }}
            onLoseFocus={() =>
              setTimeout(() => {
                this.setState({
                  parentComment: null,
                  replyingTo: "Write a comment here..."
                });
              }, 200)
            }
          />
        </React.Fragment>
      );
    } else if (!this.props.isSignedIn) {
      return <React.Fragment>{this.renderComments()}</React.Fragment>;
    }
    return <Spinner />;
  }
}

const mapStateToProps = state => {
  return {
    comments: Object.values(state.comments),
    commentOwners: Object.values(state.users),
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchComments, fetchUser })(
  ShowComment
);
