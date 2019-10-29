import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

const WizardFormFirstPage = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="ui form">
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Recipe Name"
      />
      <Field
        name="description"
        type="text"
        component={renderField}
        label="Description"
      />
      <div>
        <button type="submit" className="ui button primary">
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
