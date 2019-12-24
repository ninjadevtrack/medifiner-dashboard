import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import ResetPasswordContainer from '@routes/ResetPassword/containers/ResetPassword';

class Page extends Component {
  static displayName = 'ResetPassword'

  static getInitialProps({ query }) {
    return {
      query,
      withoutLayout: true,
    };
  }

  render() {
    const { query } = this.props;

    return (
      <div>
        <Head>
          <title key="title">Dashboard Reset Password - MedFinder</title>
        </Head>
        <ResetPasswordContainer
          userId={query.user_id}
          timestamp={query.timestamp}
          signature={query.signature}
        />
      </div>
    );
  }
}

Page.propTypes = {
  query: PropTypes.shape({
    signature: PropTypes.string,
    timestamp: PropTypes.string,
    user_id: PropTypes.string,
  }),
};

Page.defaultProps = {
  query: {},
};

export default Page;
