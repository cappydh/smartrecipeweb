import React from "react";
import { connect } from "react-redux";
import { createRecipe } from "../../redux/actions/recipeActions";
import WizardForm from "./RecipeCreateWizard/WizardForm";

class CreateRecipe extends React.Component {
  onSubmit = formValues => {
    const file = formValues["attachment"];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        base64: reader.result
      });
      formValues["attachment"] = reader.result;
      this.props.createRecipe(formValues);
    };
  };

  render() {
    return <WizardForm onSubmit={this.onSubmit} />;
  }
}

export default connect(null, { createRecipe })(CreateRecipe);
