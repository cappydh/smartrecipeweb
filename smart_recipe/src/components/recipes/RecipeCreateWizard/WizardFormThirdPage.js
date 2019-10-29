import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";

const WizardFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={handleSubmit} className="ui form">
      <div className="ui field">
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" placeholder="Notes" />
        </div>
      </div>
      <div>
        <button
          type="button"
          className="ui button negative"
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={pristine || submitting}
          className="ui button primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage);
