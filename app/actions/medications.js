import axios from 'axios';

const PREFIX = '[Medications]';

export const FETCH_FILTERS_REQUEST = `${PREFIX} FETCH_FILTERS_REQUEST`;
export const FETCH_FILTERS_SUCCESS = `${PREFIX} FETCH_FILTERS_SUCCESS`;
export const FETCH_FILTERS_FAILURE = `${PREFIX} FETCH_FILTERS_FAILURE`;

const fetchFiltersRequest = () => ({
  type: FETCH_FILTERS_REQUEST,
});

const fetchFiltersSuccess = payload => ({
  type: FETCH_FILTERS_SUCCESS,
  payload,
});

const fetchFiltersFailure = error => ({
  type: FETCH_FILTERS_FAILURE,
  error: error,
});

export const fetchFilters = params => (dispatch) => {
  dispatch(fetchFiltersRequest());

  return axios
    .get('v1/medications/filters/', { params })
    .then(response => response.data)
    .then((responseData) => {
      dispatch(fetchFiltersSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(fetchFiltersFailure(error.response));
    });
};

export const FETCH_GEO_JSON_REQUEST = `${PREFIX} FETCH_GEO_JSON_REQUEST`;
export const FETCH_GEO_JSON_SUCCESS = `${PREFIX} FETCH_GEO_JSON_SUCCESS`;
export const FETCH_GEO_JSON_FAILURE = `${PREFIX} FETCH_GEO_JSON_FAILURE`;

const fetchGeoJSONRequest = () => ({
  type: FETCH_GEO_JSON_REQUEST,
});

const fetchGeoJSONSuccess = payload => ({
  type: FETCH_GEO_JSON_SUCCESS,
  payload,
});

const fetchGeoJSONFailure = error => ({
  type: FETCH_GEO_JSON_FAILURE,
  error: error,
});

export const fetchGeoJSON = (type = '', params) => (dispatch) => {
  dispatch(fetchGeoJSONRequest());
  let typeString = '';
  if (type) {
    typeString = `${type}/${params.typeValue}/`;
  }

  return axios
    .get(`v1/medications/geo_stats/${typeString}`, { params })
    .then(response => response.data)
    .then((responseData) => {
      dispatch(fetchGeoJSONSuccess(responseData));

      return responseData;
    })
    .catch((error) => {
      dispatch(fetchGeoJSONFailure(error.response));
    });
};
