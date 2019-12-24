import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import AccountSetupContainer from '@routes/AccountSetup/containers/AccountSetup.js';

class Page extends Component {
  static isRestricted = false

  static displayName = 'LoginPage'

  static async getInitialProps({
    query,
    store,
  }) {

    return {
      token: query.token,
      withoutLayout: true,
    };
  }

  render() {
    const { token } = this.props;

    return (
      <div>
        <Head>
          <title key="title">Account setup - MedFinder</title>
        </Head>
        <AccountSetupContainer token={token} />
      </div>
    );
  }
}

Page.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Page;
