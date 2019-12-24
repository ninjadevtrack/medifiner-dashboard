import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import jwtDecode from 'jwt-decode';

import { setAuthToken } from '@app/utils/request';

import AccountSetupForm from '@routes/AccountSetup/components/AccountSetupForm';

import {
  createAccount,
  fetchMe,
} from '@actions/auth';

import globalSelectors from '@app/selectors/global';

import '@routes/AccountSetup/styles/AccountSetup.scss';

class AccountSetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: jwtDecode(props.token).email,
      organization: jwtDecode(props.token).organization
     
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(values) {
    const { token } = this.props;

    return this.props
      .createAccount({
        ...values,
        token,
      })
      .then((data) => {
        setAuthToken(data.token);
        this.props
          .fetchMe()
          .then(() => {
            Router.push('/');
          });

        return data;
      });
  }

  render() {
    const { email, organization } = this.state;

    return (
      <div className="account-setup">
        <p className="account-setup__title">
          Set Up Your Account
        </p>
        <AccountSetupForm
          initialValues={{ email, organization }}
          onSubmit={this.onFormSubmit}
        />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  createAccount,
  fetchMe,
}, dispatch);

AccountSetup.propTypes = {
  createAccount: PropTypes.func.isRequired,
  fetchMe: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(AccountSetup);
