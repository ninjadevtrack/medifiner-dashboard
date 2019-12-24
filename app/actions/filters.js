const PREFIX = '[Filters]';

export const UPDATE_FILTER = `${PREFIX} UPDATE_FILTER`;

export const updateFilter = payload => ({
  type: UPDATE_FILTER,
  payload,
});
