import axios from 'axios';
import { SubmissionError } from 'redux-form';

import { setAuthToken } from '@app/utils/request';

const PREFIX = '[Auth]';

export const LOGIN_USER_REQUEST = `${PREFIX} LOGIN_USER_REQUEST`;
export const LOGIN_USER_SUCCESS = `${PREFIX} LOGIN_USER_SUCCESS`;
export const LOGIN_USER_FAILURE = `${PREFIX} LOGIN_USER_FAILURE`;

const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

const loginUserSuccess = payload => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

const loginUserFailure = () => ({
  type: LOGIN_USER_FAILURE,
});

export const loginUser = data => (dispatch) => {
  dispatch(loginUserRequest());
  return axios
    .post('v1/accounts/obtain_token/', data)
    .then(response => response.data)
    .then((responseData) => {
      dispatch(loginUserSuccess(responseData));
      setAuthToken(responseData.token);

      return responseData;
    })
    .catch((error) => {
      dispatch(loginUserFailure());

      throw new SubmissionError(error.response.data);
    });
};

export const FETCH_ME_REQUEST = `${PREFIX} FETCH_ME_REQUEST`;
export const FETCH_ME_SUCCESS = `${PREFIX} FETCH_ME_SUCCESS`;
export const FETCH_ME_FAILURE = `${PREFIX} FETCH_ME_FAILURE`;

const fetchMeRequest = () => ({
  type: FETCH_ME_REQUEST,
});

const fetchMeSuccess = payload => ({
  type: FETCH_ME_SUCCESS,
  payload,
});

const fetchMeFailure = () => ({
  type: FETCH_ME_FAILURE,
});

export const fetchMe = () => (dispatch) => {
  dispatch(fetchMeRequest());

  return axios
    .get('v1/accounts/profile/')
    .then(response => response.data)
    .then((responseData) => {
      dispatch(fetchMeSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(fetchMeFailure());

      throw error;
    });
};

export const CREATE_ACCOUNT_REQUEST = `${PREFIX} CREATE_ACCOUNT_REQUEST`;
export const CREATE_ACCOUNT_SUCCESS = `${PREFIX} CREATE_ACCOUNT_SUCCESS`;
export const CREATE_ACCOUNT_FAILURE = `${PREFIX} CREATE_ACCOUNT_FAILURE`;

const createAccountRequest = () => ({
  type: CREATE_ACCOUNT_REQUEST,
});

const createAccountSuccess = payload => ({
  type: CREATE_ACCOUNT_SUCCESS,
  payload,
});

const createAccountFailure = () => ({
  type: CREATE_ACCOUNT_FAILURE,
});

export const createAccount = data => (dispatch) => {
  dispatch(createAccountRequest());

  return axios
    .patch('v1/accounts/sign_in/', data)
    .then(response => response.data)
    .then((responseData) => {
      dispatch(createAccountSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(createAccountFailure());

      throw new SubmissionError(error.response.data);
    });
};

export const SEND_RESET_LINK_REQUEST = `${PREFIX} SEND_RESET_LINK_REQUEST`;
export const SEND_RESET_LINK_SUCCESS = `${PREFIX} SEND_RESET_LINK_SUCCESS`;
export const SEND_RESET_LINK_FAILURE = `${PREFIX} SEND_RESET_LINK_FAILURE`;

const sendResetLinkRequest = () => ({
  type: SEND_RESET_LINK_REQUEST,
});

const sendResetLinkSuccess = payload => ({
  type: SEND_RESET_LINK_SUCCESS,
  payload,
});

const sendResetLinkFailure = () => ({
  type: SEND_RESET_LINK_FAILURE,
});

export const sendResetLink = data => (dispatch) => {
  dispatch(sendResetLinkRequest());

  return axios
    .post('v1/accounts/send-reset-password-link/', data)
    .then(response => response.data)
    .then((responseData) => {
      dispatch(sendResetLinkSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(sendResetLinkFailure());

      throw new SubmissionError(error.response.data);
    });
};

export const RESET_PASSWORD_REQUEST = `${PREFIX} RESET_PASSWORD_REQUEST`;
export const RESET_PASSWORD_SUCCESS = `${PREFIX} RESET_PASSWORD_SUCCESS`;
export const RESET_PASSWORD_FAILURE = `${PREFIX} RESET_PASSWORD_FAILURE`;

const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST,
});

const resetPasswordSuccess = payload => ({
  type: RESET_PASSWORD_SUCCESS,
  payload,
});

const resetPasswordFailure = () => ({
  type: RESET_PASSWORD_FAILURE,
});

export const resetPassword = data => (dispatch) => {
  dispatch(resetPasswordRequest());

  return axios
    .post('v1/accounts/reset-password/', data)
    .then(response => response.data)
    .then((responseData) => {
      dispatch(resetPasswordSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(resetPasswordFailure());

      throw new SubmissionError(error.response.data);
    });
};


export const SEND_ORGANIZATION_CHANGE_FORM_REQUEST = `${PREFIX} SEND_ORGANIZATION_CHANGE_FORM_REQUEST`;
export const SEND_ORGANIZATION_CHANGE_FORM_SUCCESS = `${PREFIX} SEND_ORGANIZATION_CHANGE_FORM_SUCCESS`;
export const SEND_ORGANIZATION_CHANGE_FORM_FAILURE = `${PREFIX} SEND_ORGANIZATION_CHANGE_FORM_FAILURE`;

const sendOrganizationFormRequest = () => ({
  type: SEND_ORGANIZATION_CHANGE_FORM_REQUEST,
});

const sendOrganizationFormSuccess = payload => ({
  type: SEND_ORGANIZATION_CHANGE_FORM_SUCCESS,
  payload,
});

const sendOrganizationFormFailure = () => dispatch => ({
  type: SEND_ORGANIZATION_CHANGE_FORM_FAILURE,
});

export const sendOrganizationForm = data => (dispatch) => {
  dispatch(sendOrganizationFormRequest());
 
  return axios
    .post('v1/public/organization_change_form/', data)
    .then(response => response.data)
    .then((responseData) => {
      dispatch(sendOrganizationFormSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(sendOrganizationFormFailure());

      throw error;
    });
};