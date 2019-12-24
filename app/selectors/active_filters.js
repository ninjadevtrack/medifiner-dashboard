import activeFilterNames from '@app/selectors/active_filter_names'

const getActiveFilters = (filters) => {
  let params = {}

  activeFilterNames().forEach(activeFilterKey => {
    filters[activeFilterKey].forEach(option => {
      if(option.checked){
        if(!params[activeFilterKey]){
          params[activeFilterKey] = [];
        }
        params[activeFilterKey].push(option.id);
      }
    })
  });

  return params;
}

export default getActiveFilters;
