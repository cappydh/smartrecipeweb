import React from "react";
import Modal from "../Modal";
import history from "../../history";
import FollowCard from "../FollowCard";

class ShowFollowers extends React.Component {
  renderContent() {
    return <FollowCard followedId={this.props.match.params.id} />;
  }

  render() {
    return (
      <Modal
        title="Follower"
        content={this.renderContent()}
        onDismiss={() => history.push(`/user/${this.props.match.params.id}`)}
      />
    );
  }
}

export default ShowFollowers;
