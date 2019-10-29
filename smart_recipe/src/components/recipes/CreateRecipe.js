import React from "react";
import { connect } from "react-redux";
import { createRecipe } from "../../actions";
import WizardForm from "./RecipeCreateWizard/WizardForm";

class CreateRecipe extends React.Component {
  onSubmit = formValues => {
    this.props.createRecipe(formValues);
  };

  render() {
    return <WizardForm onSubmit={this.onSubmit} />;
  }
}

export default connect(
  null,
  { createRecipe }
)(CreateRecipe);
