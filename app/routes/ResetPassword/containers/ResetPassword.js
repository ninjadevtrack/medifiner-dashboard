import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import ResetPasswordForm from '@routes/ResetPassword/components/ResetPasswordForm';
import SendResetLinkForm from '@routes/ResetPassword/components/SendResetLinkForm';

import {
  resetPassword,
  sendResetLink,
} from '@actions/auth';

import '@routes/ResetPassword/styles/ResetPassword.scss';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetLinkSent: false
    }

    this.onSendResetLinkSubmit = this.onSendResetLinkSubmit.bind(this);
    this.onResetPasswordSubmit = this.onResetPasswordSubmit.bind(this);
  }

  onSendResetLinkSubmit(values) {
    return this.props.sendResetLink(values)
      .then(() => {

        this.setState({resetLinkSent: true})

        setTimeout(() => {
          Router.push('/login');
        }, 5000);
      });
  }

  onResetPasswordSubmit(values) {
    return this.props.resetPassword(values)
      .then(() => {
        Router.push('/login');
      });
  }

  render() {
    const {
      signature,
      timestamp,
      userId,
    } = this.props;

    return (
      <div className="reset-password">
        <p className="reset-password__title">
          Reset Password
        </p>
        {(signature && timestamp && userId) ? (
          <ResetPasswordForm
            initialValues={{
              signature,
              timestamp,
              userId,
            }}
            onSubmit={this.onResetPasswordSubmit}
          />
        ) : [
          <p
            key="description"
            className="reset-password__description"
          >
            Enter your email address to send reset password link
          </p>,
          <SendResetLinkForm
            key="form"
            onSubmit={this.onSendResetLinkSubmit}
            resetLinkSent={this.state.resetLinkSent}
          />,
        ]}
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetPassword,
  sendResetLink,
}, dispatch);

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  sendResetLink: PropTypes.func.isRequired,
  signature: PropTypes.string,
  timestamp: PropTypes.string,
  userId: PropTypes.string,
};

ResetPassword.defaultProps = {
  signature: null,
  timestamp: null,
  userId: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
