import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createUser } from "../../redux/actions/userActions";
import validate from "./validate";
import FileInput from "../FileInput";

class Signup extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta, type }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" type={type} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    const file = formValues["profilepicture"];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        base64: reader.result
      });
      formValues["profilepicture"] = reader.result;
      this.props.createUser(formValues);
    };
  };

  render() {
    return (
      <div className="ui segment">
        <h2>Sign Up Form</h2>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="firstname"
            component={this.renderInput}
            label="First Name"
          />
          <Field
            name="lastname"
            component={this.renderInput}
            label="Last Name"
          />
          <Field
            name="username"
            component={this.renderInput}
            label="User Name"
          />
          <Field
            name="email"
            component={this.renderInput}
            label="E-mail Address"
          />
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
            type="password"
          />
          <div className="field">
            <label>Profile picture</label>
            <Field
              name="profilepicture"
              component={FileInput}
              type="file"
              accept=".png, .jpg, .jpeg"
            />
          </div>
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const formWrapped = reduxForm({
  form: "userCreate",
  validate
})(Signup);

export default connect(null, { createUser })(formWrapped);
