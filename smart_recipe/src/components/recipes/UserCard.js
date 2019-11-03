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
            className="ui tiny left floated image"
            src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
            alt="placeholder"
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <img
          className="ui tiny left floated image"
          src={this.props.user.profilepicture}
          alt={this.props.user.id}
        />
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
        <div className="content">
          {this.renderUserPicture()}
          <div className="header">
            {user.firstname} {user.lastname}
          </div>
          <div className="meta">23.10.2019</div>
          <div className="description">Description will be here</div>
        </div>
        <div className="extra content">
          <div className="ui right labeled button" tabIndex="0">
            <button className="ui blue button">
              <i aria-hidden="true" className="plus icon"></i>
              Follow
            </button>
            <div className="ui blue left pointing basic label">1234</div>
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
