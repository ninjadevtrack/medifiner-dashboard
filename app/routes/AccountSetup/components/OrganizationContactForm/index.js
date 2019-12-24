import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import PropTypes from 'prop-types';
import ToolTip from '@common/components/ToolTip'
import Button from '@common/components/Button';
import Input from '@common/components/ReduxFields/Input';
import TextArea from '@common/components/TextArea';

import { required } from '@app/utils/validators';

import '@common/styles/modal.scss';
import './styles.scss'
const OrganizationContactForm = ({ handleSubmit }) => (
  <form
    className="modal"
    onSubmit={handleSubmit}
  >
    <p className="modal__title">
      Organization Change Request Form
    </p>
    <p className="modal__text">
    Please include the name of the organization that you are part of.
    </p>
    <div className="modal__row">
      <div className="modal__column">
        <Field
          name="name"
          label="Name"
          component={Input}
          validate={required}
        />
      </div>
      <div className="modal__column">
        <Field
          name="email"
          type="email"
          label="Email Address"
          rows="10"
          component={Input}
          validate={required}
        />
      </div>
    </div>
    <div className="modal__row">
      <div className="modal__full-column">
        <div className="field__textarea">
          <div>Message<ToolTip title="Change your organization.">Please include the name of the organization that you are part of.</ToolTip></div>
          <Field
            name="message"
            type="textarea"
            rows="5"
            component={TextArea}
            validate={required}
          />
        </div>
      </div>
    </div>
    <div className="modal__button-container">
      <Button type="submit">
        Send Email
      </Button>
    </div>
  </form>
);

OrganizationContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'organizationContactForm',
})(OrganizationContactForm
);
