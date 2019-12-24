import moment from 'moment';

import {
  UPDATE_FILTER,
} from '@actions/filters';

import {
  FETCH_ME_SUCCESS,
} from '@actions/auth';

const initialState = {
  activeDate: moment().subtract(13, 'days').format('MM/DD/YYYY'),
  mapDate: moment().format('MM/DD/YYYY'),
  activeMedication: null,
  activeStateCategory: null,
  activeStateItem: null,
};

export default (state = initialState, action) => {
  const {
    payload,
    type,
  } = action;

  switch (type) {
    case FETCH_ME_SUCCESS: {
      return {
        ...state,
        activeStateCategory: payload.permissionLevel === 'sl' ? 'usa' : null,
        activeStateItem: payload.permissionLevel === 'sl' ? payload.state : null,
      };
    }
    case UPDATE_FILTER: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};
