const validate = formValues => {
  const errors = {};

  if (!formValues.firstname) {
    errors.firstname = "You must enter a First Name";
  }

  if (!formValues.lastname) {
    errors.lastname = "You must enter a Last Name";
  }

  if (!formValues.username) {
    errors.username = "You must enter a Username";
  }

  if (!formValues.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (!formValues.password) {
    errors.password = "You must enter a Password";
  }

  return errors;
};

export default validate;
