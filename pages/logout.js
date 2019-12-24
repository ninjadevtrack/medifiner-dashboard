import React, { Component } from 'react';
import Head from 'next/head';

import LogoutContainer from '@routes/Logout/containers/Logout';

class Page extends Component {
  static getInitialProps() {
    return {
      withoutLayout: true,
    };
  }

  render() {
    return (
      <div>
        <Head>
          <title key="title">Dashboard Logout - MedFinder</title>
        </Head>
        <LogoutContainer />
      </div>
    );
  }
}

export default Page;
