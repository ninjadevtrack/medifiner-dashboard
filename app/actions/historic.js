import axios from 'axios';

const PREFIX = '[Historic]';

export const FETCH_AVERAGE_DATA_REQUEST = `${PREFIX} FETCH_AVERAGE_DATA_REQUEST`;
export const FETCH_AVERAGE_DATA_SUCCESS = `${PREFIX} FETCH_AVERAGE_DATA_SUCCESS`;
export const FETCH_AVERAGE_DATA_FAILURE = `${PREFIX} FETCH_AVERAGE_DATA_FAILURE`;

const fetchAverageDataRequest = () => ({
  type: FETCH_AVERAGE_DATA_REQUEST,
});

const fetchAverageDataSuccess = payload => ({
  type: FETCH_AVERAGE_DATA_SUCCESS,
  payload,
});

const fetchAverageDataFailure = () => ({
  type: FETCH_AVERAGE_DATA_FAILURE,
});

export const fetchAverageData = (type = '', params) => (dispatch) => {
  dispatch(fetchAverageDataRequest());
  let typeString = '';
  if (type) {
    typeString = `${type}/${params.typeValue}/`;
  }

  if (!params.medId){
    dispatch(fetchAverageDataSuccess({}));
    return {};
  }

  return axios
    .get(`v1/historic/average/${typeString}`, { params })
    .then(response => response.data)
    .then((responseData) => {
      dispatch(fetchAverageDataSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(fetchAverageDataFailure());

      throw error;
    });
};

export const FETCH_OVERALL_DATA_REQUEST = `${PREFIX} FETCH_OVERALL_DATA_REQUEST`;
export const FETCH_OVERALL_DATA_SUCCESS = `${PREFIX} FETCH_OVERALL_DATA_SUCCESS`;
export const FETCH_OVERALL_DATA_FAILURE = `${PREFIX} FETCH_OVERALL_DATA_FAILURE`;

const fetchOverallDataRequest = () => ({
  type: FETCH_OVERALL_DATA_REQUEST,
});

const fetchOverallDataSuccess = payload => ({
  type: FETCH_OVERALL_DATA_SUCCESS,
  payload,
});

const fetchOverallDataFailure = () => ({
  type: FETCH_OVERALL_DATA_FAILURE,
});

export const fetchOverallData = (type = '', params) => (dispatch) => {
  dispatch(fetchOverallDataRequest());
  let typeString = '';
  if (type) {
    typeString = `${type}/${params.typeValue}/`;
  }

  if (!params.medId){
    dispatch(fetchOverallDataSuccess({}));
    return {};
  }

  return axios
    .get(`v1/historic/overall/${typeString}`, { params })
    .then(response => response.data)
    .then((responseData) => {
      dispatch(fetchOverallDataSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(fetchOverallDataFailure());

      throw error;
    });
};
