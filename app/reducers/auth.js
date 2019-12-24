import {
  FETCH_ME_FAILURE,
  FETCH_ME_REQUEST,
  FETCH_ME_SUCCESS,
} from '@actions/auth';

const initialState = {
  me: {
    isFetching: true,
    data: {},
  },
};

export default (state = initialState, action) => {
  const {
    payload,
    type,
  } = action;

  switch (type) {
    case FETCH_ME_REQUEST: {
      return {
        ...state,
        me: {
          ...state.me,
          isFetching: true,
        },
      };
    }
    case FETCH_ME_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          isFetching: false,
          data: payload,
        },
      };
    }
    case FETCH_ME_FAILURE: {
      return {
        ...state,
        me: {
          ...state.me,
          isFetching: false,
        },
      };
    }
    default:
      return state;
  }
};
