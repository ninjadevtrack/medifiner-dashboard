import {
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_STATES_FAILURE,
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
} from '@actions/global';

const initialState = {
  states: {
    isFetching: true,
    list: [],
  },  
};

export default (state = initialState, action) => {
  const {
    payload,
    type,
  } = action;

  switch (type) {
    case FETCH_STATES_REQUEST: {
      return {
        ...state,
        states: {
          ...state.states,
          isFetching: true,
        },
      };
    }
    case FETCH_STATES_SUCCESS: {
      return {
        ...state,
        states: {
          ...state.states,
          isFetching: false,
          list: payload,
        },
      };
    }
    case FETCH_STATES_FAILURE: {
      return {
        ...state,
        states: {
          ...state.states,
          isFetching: false,
        },
      };
    }
    
    default:
      return state;
  }
};
