import React, { Component } from 'react';
import Head from 'next/head';

import LoginContainer from '@routes/Login/containers/Login';

class LoginPage extends Component {
  static displayName = 'LoginPage'

  static getInitialProps() {
    return {
      withoutLayout: true,
    };
  }

  render() {
    return (
      <div>
        <Head>
          <title key="title">Dashboard Login - MedFinder</title>
        </Head>
        <LoginContainer />
      </div>
    );
  }
}

export default LoginPage;
