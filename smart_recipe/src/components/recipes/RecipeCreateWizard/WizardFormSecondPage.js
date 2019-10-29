import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";

const colors = [
  "Soup",
  "Appetizer",
  "Salad",
  "Dessert",
  "Main Dish",
  "Drink",
  "Bread"
];

const renderError = meta => {
  if (meta.touched && meta.error) {
    return (
      <div className="ui negative message">
        <div>{meta.error}</div>
      </div>
    );
  }
};

const renderColorSelector = ({ input, meta }) => (
  <div>
    <select {...input}>
      <option value="">Select a category...</option>
      {colors.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {renderError(meta)}
  </div>
);

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit} className="ui form">
      <div className="ui field">
        <label>Recipe Category</label>
        <Field name="recipeType" component={renderColorSelector} />
      </div>
      <div>
        <button
          type="button"
          className="ui button negative"
          onClick={previousPage}
        >
          Previous
        </button>
        <button type="submit" className="ui button primary">
          Next
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
})(WizardFormSecondPage);
