import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";

class UserCard extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }

  renderUserPicture() {
    if (!this.props.user.profilepicture) {
      return (
        <React.Fragment>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
            alt="placeholder"
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <img src={this.props.user.profilepicture} alt={this.props.user.id} />
      </React.Fragment>
    );
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }
    return (
      <div className="ui card">
        <div className="image">
          {this.renderUserPicture()}
          <div className="content">
            <div className="header">
              {user.firstname} {user.lastname}
            </div>
            <div className="meta">Joined Date</div>
            <div className="description">Description will be here</div>
          </div>
          <div className="extra content">
            <i className="user icon"></i>
            xx Followers
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id === ownProps.userId) };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(UserCard);
