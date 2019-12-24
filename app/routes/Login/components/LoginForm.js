import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Button from '@common/components/Button';
import ErrorComponent from '@common/components/ReduxFields/Error';
import Input from '@common/components/ReduxFields/Input';

import '@routes/Login/styles/LoginForm.scss';

const LoginForm = ({ handleSubmit }) => (
  <form
    className="login-form"
    onSubmit={handleSubmit}
  >
    <Field
      name="nonFieldErrors"
      component={ErrorComponent}
    />
    <div className="login-form__input-container">
      <Field
        name="email"
        type="email"
        placeholder="Email Address"
        component={Input}
      />
    </div>
    <div className="login-form__input-container">
      <Field
        name="password"
        type="password"
        placeholder="Password"
        component={Input}
      />
    </div>
    <p className="login-form__link-container">
      <Link href="/reset-password">
        <a className="login-form__reset-password-link">
          Reset your password
        </a>
      </Link>
    </p>
    <p className="login-form__button-container">
      <Button
        wide
        type="submit"
      >
        Login
      </Button>
    </p>
    <p className="login-form__text">
      Missing your login credentials? Please contact <a href="mailto:medfinder@healthmap.org">medfinder@healthmap.org</a>
    </p>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
})(LoginForm);
