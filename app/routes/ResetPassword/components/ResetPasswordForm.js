import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import PropTypes from 'prop-types';

import Button from '@common/components/Button';
import ErrorComponent from '@common/components/ReduxFields/Error';
import Input from '@common/components/ReduxFields/Input';

import {
  required,
  sameValue,
} from '@app/utils/validators';

import '@routes/ResetPassword/styles/ResetPasswordForm.scss';

function validate(values) {
  const error = {};

  error.password = required(values.password);

  if (!values.passwordRepeat) {
    error.passwordRepeat = required(values.passwordRepeat);
  } else {
    error.passwordRepeat = sameValue(values.passwordRepeat, values.password, 'Passwords');
  }

  return error;
}

const ResetPassword = ({ handleSubmit }) => (
  <form
    className="reset-password-form"
    onSubmit={handleSubmit}
  >
    <Field
      name="nonFieldErrors"
      component={ErrorComponent}
    />
    <div className="reset-password-form__fields-container">
      <Field
        name="password"
        type="password"
        label="Password*"
        placeholder="Enter Password"
        component={Input}
      />
      <Field
        name="passwordRepeat"
        type="password"
        placeholder="Confirm Password"
        component={Input}
      />
    </div>
    <p className="reset-password-form__button-container">
      <Button
        wide
        type="submit"
      >
        Reset Password
      </Button>
    </p>
  </form>
);

ResetPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'resetPassword',
  validate,
})(ResetPassword);
