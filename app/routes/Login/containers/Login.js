import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import LoginForm from '@routes/Login/components/LoginForm';

import {
  fetchMe,
  loginUser,
} from '@actions/auth';

import '@routes/Login/styles/LoginPage.scss';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  onLoginSubmit(values) {
    return this.props
      .loginUser(values)
      .then(() => this.props.fetchMe())
      .then(() => {
        Router.push('/');
      });
  }

  render() {
    return (
      <div className="login-page">
        <p className="login-page__title">
          MedFinder Dashboard
        </p>
        <p className="login-page__description">
          Please login to access your dashboard
        </p>
        <div className="login-page__form">
          <LoginForm onSubmit={this.onLoginSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMe,
  loginUser,
}, dispatch);

LoginContainer.propTypes = {
  fetchMe: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
