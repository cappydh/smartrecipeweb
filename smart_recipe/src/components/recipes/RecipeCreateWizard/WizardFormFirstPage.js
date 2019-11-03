import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import FieldInput from "../../FileInput";

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
      <div className="field">
        <label>Attachment</label>
        <Field
          name="attachment"
          component={FieldInput}
          type="file"
          accept=".png, .jpg, .jpeg"
        />
      </div>
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
