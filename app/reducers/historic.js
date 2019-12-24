import {
  FETCH_AVERAGE_DATA_FAILURE,
  FETCH_AVERAGE_DATA_REQUEST,
  FETCH_AVERAGE_DATA_SUCCESS,
  FETCH_OVERALL_DATA_FAILURE,
  FETCH_OVERALL_DATA_REQUEST,
  FETCH_OVERALL_DATA_SUCCESS,
} from '@actions/historic';

const initialState = {
  average: {
    isFetching: false,
    data: [],
  },
  overall: {
    isFetching: false,
    list: [],
  },
};

export default (state = initialState, action) => {
  const {
    payload,
    type,
  } = action;

  switch (type) {
    case FETCH_AVERAGE_DATA_REQUEST: {
      return {
        ...state,
        average: {
          ...state.average,
          isFetching: true,
        },
      };
    }
    case FETCH_AVERAGE_DATA_SUCCESS: {
      return {
        ...state,
        average: {
          ...state.average,
          isFetching: false,
          data: payload,
        },
      };
    }
    case FETCH_AVERAGE_DATA_FAILURE: {
      return {
        ...state,
        average: {
          ...state.average,
          isFetching: false,
        },
      };
    }
    case FETCH_OVERALL_DATA_REQUEST: {
      return {
        ...state,
        overall: {
          ...state.overall,
          isFetching: true,
        },
      };
    }
    case FETCH_OVERALL_DATA_SUCCESS: {
      return {
        ...state,
        overall: {
          ...state.overall,
          isFetching: false,
          list: payload,
        },
      };
    }
    case FETCH_OVERALL_DATA_FAILURE: {
      return {
        ...state,
        overall: {
          ...state.overall,
          isFetching: false,
        },
      };
    }
    default:
      return state;
  }
};
