import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import PropTypes from 'prop-types';

import Button from '@common/components/Button';
import ErrorComponent from '@common/components/ReduxFields/Error';
import Input from '@common/components/ReduxFields/Input';

import { required } from '@app/utils/validators';

const SendResetLink = ({ handleSubmit, resetLinkSent }) => (
  <form
    className="send-reset-link"
    onSubmit={handleSubmit}
  >
    <Field
      name="nonFieldErrors"
      component={ErrorComponent}
    />
    <div className="send-reset-link__input-container">
      <Field
        name="login"
        type="email"
        placeholder="Email Address"
        component={Input}
        validate={required}
      />
    </div>
    <p className="send-reset-link__button-container">
      <Button
        wide
        type="submit"
      >
        Send link
      </Button>
    </p>
    {resetLinkSent && (
      <p>Thank you. You will receive an email shortly with a link to reset your password.</p>
    )}
  </form>
);

SendResetLink.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  resetLinkSent: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'sendResetLink',
})(SendResetLink);
