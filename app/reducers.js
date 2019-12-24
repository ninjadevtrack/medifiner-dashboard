import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from '@app/reducers/auth';
import filters from '@app/reducers/filters';
import globalReducer from '@app/reducers/global';
import historic from '@app/reducers/historic';
import medications from '@app/reducers/medications';

export default combineReducers({
  auth,
  filters,
  form: formReducer,
  global: globalReducer,
  historic,
  medications,
});
