import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import PropTypes from 'prop-types';

import serverCookie from 'cookie';
import Cookie from 'js-cookie';

import Layout from '@common/components/Layout';

import configureRequests from '@app/utils/request';
import configureStore from '@app/store';

import { fetchMe } from '@actions/auth';

import { redirect } from '@app/utils/helpers';

import '@common/styles/normalize.scss';
import '@common/styles/base.scss';

class MyApp extends App {
  // Override for IE10 `withRouter`
  // https://github.com/zeit/next.js/issues/4687#issuecomment-401985901
  static childContextTypes = {
    headManager: PropTypes.object,
    router: PropTypes.object
  }

  getChildContext() {
    const { router } = this.props;

    return { router };
  }

  static async getInitialProps({
    Component,
    ctx,
    router,
  }) {
    const {
      isServer,
      req,
      res,
      store,
    } = ctx;
    let token = null;

    if (isServer) {
      if (req.headers.cookie) {
        const cookies = serverCookie.parse(req.headers.cookie);
        token = cookies.token || null;
      }

      configureRequests(token, isServer);

      if (token && router.route !== '/login' && router.route !== '/logout') {
        try {
          await store.dispatch(fetchMe());
        } catch (error) {
          token = null;
          redirect(isServer, res, '/logout');
        }
      }
    } else {
      token = Cookie.get('token');
    }

    if (Component.isRestricted && !token) {
      redirect(isServer, res, '/login');
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  componentWillMount() {
    configureRequests();
  }

  render() {
    const {
      Component,
      pageProps,
      store,
    } = this.props;

    return (
      <Container>
        <Head>
          <title key="title">MedFinder</title>
        </Head>
        <Provider store={store}>
          <Layout
            withoutLayout={pageProps.withoutLayout}
            componentName={Component.displayName}
          >
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(MyApp);
