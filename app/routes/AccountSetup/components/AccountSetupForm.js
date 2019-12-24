import React, { Component } from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@common/components/Button';
import Input from '@common/components/ReduxFields/Input';
import Select from '@common/components/ReduxFields/Select';
import Modal from 'react-modal';
import {
  required,
  sameValue,
} from '@app/utils/validators';
import { sendOrganizationForm } from '@app/actions/auth'
import '@routes/AccountSetup/styles/AccountSetupForm.scss';
import OrganizationContactForm from './OrganizationContactForm';

import './styles.scss';

function validate(values) {
  const error = {};

  error.email = required(values.email);
  error.password = required(values.password);

  if (!values.passwordRepeat) {
    error.passwordRepeat = required(values.passwordRepeat);
  } else {
    error.passwordRepeat = sameValue(values.passwordRepeat, values.password, 'Passwords');
  }

  error.organization = required(values.organization);
  error.role = required(values.role);

  return error;
}

class AccountSetupForm extends Component {

  constructor() {
    super();
    this.state = {
      showPopup:false
    }

    Modal.setAppElement('body');

    this.showModal = this.showModal.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.onSendEmail = this.onSendEmail.bind(this);
  }

  showModal() {
    this.setState({
      showPopup: true
    })
  }
  
  closePopup() {
    this.setState({
      showPopup: false
    })
  }

  onSendEmail(values) {
    const { sendOrganizationForm } = this.props;
    sendOrganizationForm(values);
    this.closePopup();
  }

  

  render() {
    const { handleSubmit } = this.props;
    const { showPopup } = this.state;
    return (
      <div>
        <Modal
        shouldCloseOnEsc
        isOpen={showPopup}
        overlayClassName="contact__modal-overlay"
        className="contact__modal-content"
        onRequestClose={this.closePopup}
      >
        <button
          type="button"
          className="contact__close-button"
          onClick={this.closePopup}
          >
          <i className="fas fa-times-circle" />
        </button>
         <OrganizationContactForm
          onSubmit={this.onSendEmail}
        /> 
      </Modal>
    <form
      className="account-setup-form"
      onSubmit={handleSubmit}
    >
      <p className="account-setup-form__text">
        * Required fields
      </p>
      <div className="account-setup-form__fields-container">
        <Field
          readOnly
          name="email"
          type="email"
          label="Email*"
          component={Input}
        />
      </div>
      <div className="account-setup-form__fields-container">
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
      <div className="account-setup-form__fields-container-organization">
        <Field
          readOnly
          name="organization"
          label="Organization*"
          placeholder="Your Organization"
          component={Input}
          placeholder="Your Organization"
        />
        <a onClick={this.showModal} className="account-setup-form__fields-link">This is not my organization</a>
      </div>
      <div className="account-setup-form__fields-container">
        <Field
          name="role"
          label="Role*"
          placeholder="Your Organizational Role"
          component={Input}
        />
      </div>
      <p className="account-setup-form__button-container">
        <Button
          wide
          type="submit"
        >
          Login
        </Button>
      </p>
    </form>
    </div>
    );
    }
  }

AccountSetupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  sendOrganizationForm: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendOrganizationForm,
}, dispatch);



export default reduxForm({
  form: 'accountSetup',
  validate,
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountSetupForm));
