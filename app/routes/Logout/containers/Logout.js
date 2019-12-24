import React, { Component } from 'react';

import { clearAuthToken } from '@app/utils/request';

export default class Logout extends Component {
  componentDidMount() {
    clearAuthToken();
    window.location = '/login';
  }

  render() {
    return (
      <div />
    );
  }
}
