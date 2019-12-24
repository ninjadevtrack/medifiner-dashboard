import React, { Component } from 'react';
import Head from 'next/head';

import MapViewContainer from '@routes/Index/containers/MapView';

class Page extends Component {
  static isRestricted = true

  static displayName = 'MapPage'

  render() {
    return (
      <div>
        <Head>
          <title key="title">MapView - MedFinder</title>
        </Head>
        <MapViewContainer />
      </div>
    );
  }
}

export default Page;
