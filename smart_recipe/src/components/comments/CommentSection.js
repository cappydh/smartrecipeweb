import React from "react";
import CreateComment from "./CreateComment";
import ShowComment from "./ShowComment";

const CommentSection = props => {
  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      <ShowComment recipeId={props.commentedRecipe} />
      <CreateComment commentedRecipe={props.commentedRecipe} />
    </div>
  );
};

export default CommentSection;
