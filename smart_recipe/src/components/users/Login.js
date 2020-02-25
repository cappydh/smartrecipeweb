import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

class Login extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div>{error}</div>
        </div>
      );
    }
  }

  renderSigninError() {
    if (this.props.errorMessage) {
      return (
        <div className="ui error message">
          <div>{this.props.errorMessage}</div>
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
    this.props.loginUser(formValues);
  };

  render() {
    return (
      <div className="ui segment">
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="username"
            component={this.renderInput}
            label="Username"
          />
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
            type="password"
          />
          <button className="ui button primary">Submit</button>
          <Link to="/signup" className="ui button negative">
            Signup
          </Link>
          {this.renderSigninError()}
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.username) {
    errors.username = "You must enter a Username";
  }

  if (!formValues.password) {
    errors.password = "You must enter a Password";
  }

  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.users.errorMessage };
};

const formWrapped = reduxForm({
  form: "userLogin",
  validate
})(Login);

export default connect(mapStateToProps, { loginUser })(formWrapped);
