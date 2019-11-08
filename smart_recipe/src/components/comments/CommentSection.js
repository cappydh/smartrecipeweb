import React from "react";
import ShowComment from "./ShowComment";

const CommentSection = props => {
  return (
    <div
      className="ui comments"
      style={{ paddingTop: "150px", paddingBotom: "50px" }}
    >
      <h3 className="ui dividing header">Comments</h3>
      <ShowComment recipeId={props.commentedRecipe} />
    </div>
  );
};

export default CommentSection;
