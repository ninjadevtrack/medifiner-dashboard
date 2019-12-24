/* eslint-disable */
import axios from 'axios';
import Cookie from 'js-cookie';
import {
  toSnakeCase,
  toCamelCase,
} from 'case-converter';

import {
  getToken,
  hasToken,
} from '@app/utils/auth';
import env from '@app/utils/env';

function parseError(error) {
  const { response = {} } = error;

  return {
    ...error,
    response: {
      ...response,
      data: {
        ...toCamelCase(response.data),
        _error: response.data ? response.data.non_field_errors : [],
      },
    },
  };
}

export const setAuthToken = (token) => {
  Cookie.set('token', token, { expires: 1 });

  axios.defaults.headers.common.Authorization = `Token ${token}`;
}

export function clearAuthToken() {
  Cookie.remove('token');

  axios.defaults.headers.common.Authorization = '';
}

export default (token = null, isServer = false) => {
  let requestsList = [];

  axios.defaults.baseURL = env.BACKEND_URL;

  if (token || hasToken()) {
    axios.defaults.headers.common.Authorization = `Token ${token || getToken()}`;
  }

  if (!isServer) {
    axios.interceptors.request.use((config) => {
      if (config.method === 'get') {
        const cancelToken = axios.CancelToken.source();
        const sameRequests = requestsList.filter(r => r.url === `${config.baseURL}${config.url}` || r.url === config.url);
        sameRequests.forEach((el) => {
          el.customCancelToken.cancel(`cancel|`);
          el.cancelled = true;
        });
        config.cancelToken = cancelToken.token;
        config.customCancelToken = cancelToken;
        requestsList.push(config);
      }

      return config;
    });
  }

  axios.interceptors.request.use((config) => {
    return {
      ...config,
      data: config.data ? toSnakeCase(config.data) : config.data,
      params: config.params ? toSnakeCase(config.params) : config.params,
    };
  });

  axios.interceptors.response.use((response) => {
    requestsList = requestsList.filter(r => r.url !== response.config.url);

    return {
      ...response,
      data: toCamelCase(response.data),
    };
  }, (error) => {
    if (typeof window !== 'undefined') {
      const isCancel = error.message && (error.message.indexOf('cancel|') === 0);
      if (isCancel) {
        requestsList = requestsList.filter(r => !r.cancelled);
      }
    }

    return Promise.reject(parseError(error));
  });
};
