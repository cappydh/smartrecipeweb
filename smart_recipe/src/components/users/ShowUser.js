import React from "react";

const ShowUser = props => {
  console.log(props.match.params.id);
  return <div>ShoUser</div>;
};

export default ShowUser;
