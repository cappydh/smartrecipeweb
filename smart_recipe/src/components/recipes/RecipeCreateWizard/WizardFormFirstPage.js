import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...inputProps}
      {...props}
    />
  );
};

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
          component={FileInput}
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
