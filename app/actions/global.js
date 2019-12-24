import axios from 'axios';

const PREFIX = '[Global]';

export const FETCH_STATES_REQUEST = `${PREFIX} FETCH_STATES_REQUEST`;
export const FETCH_STATES_SUCCESS = `${PREFIX} FETCH_STATES_SUCCESS`;
export const FETCH_STATES_FAILURE = `${PREFIX} FETCH_STATES_FAILURE`;

const fetchStatesRequest = () => ({
  type: FETCH_STATES_REQUEST,
});

const fetchStatesSuccess = payload => ({
  type: FETCH_STATES_SUCCESS,
  payload,
});

const fetchStatesFailure = () => ({
  type: FETCH_STATES_FAILURE,
});

export const fetchStates = params => (dispatch) => {
  dispatch(fetchStatesRequest());

  return axios
    .get('v1/medications/states/', { params })
    .then(response => response.data)
    .then((responseData) => {
      dispatch(fetchStatesSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(fetchStatesFailure());

      throw error;
    });
};

