import React from "react";
import Modal from "../Modal";
import history from "../../history";
import FollowCard from "../FollowCard";

class ShowFollowings extends React.Component {
  renderContent() {
    return <FollowCard followingId={this.props.match.params.id} />;
  }

  render() {
    return (
      <Modal
        title="Following"
        content={this.renderContent()}
        onDismiss={() => history.push(`/user/${this.props.match.params.id}`)}
      />
    );
  }
}

export default ShowFollowings;
