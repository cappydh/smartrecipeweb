import React from "react";

const renderError = meta => {
  if (meta.touched && meta.error) {
    return (
      <div className="ui negative message">
        <div>{meta.error}</div>
      </div>
    );
  }
};

const renderField = ({ input, label, type, meta }) => (
  <div className="field">
    <label>{label}</label>
    <input {...input} placeholder={label} type={type} />
    {renderError(meta)}
  </div>
);

export default renderField;
