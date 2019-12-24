import {
  FETCH_FILTERS_FAILURE,
  FETCH_FILTERS_REQUEST,
  FETCH_FILTERS_SUCCESS,
  FETCH_GEO_JSON_FAILURE,
  FETCH_GEO_JSON_REQUEST,
  FETCH_GEO_JSON_SUCCESS,
} from '@actions/medications';

const initialState = {
  geoJSON: {
    isFetching: 0,
    data: {},
  },
  filters: {
    isFetching: true,
    list: {
      drugTypes: [],
      formulations: [],
      providerCategories: [],
      providerTypes: [],
    },
  },
};

// TODO: refactor me... monkey patched by a monkey
const mergeFilters = (old_filters, new_filters) => {
  Object.keys(new_filters).map(filterName => {
    new_filters[filterName].map(filter => {

      if(filterName == 'formulations'){
        for(var i=0;i<new_filters[filterName].length;i++){
          Object.keys(new_filters[filterName][i]).map(prop => {
            for(var j=0;j<new_filters[filterName][i][prop].length;j++){
              new_filters[filterName][i][prop][j].checked = true


              if(new_filters[filterName][i][prop][j].dosages){
                for(var k=0;k<new_filters[filterName][i][prop][j].dosages.length;k++){
                  new_filters[filterName][i][prop][j].dosages[k].checked = true
                }
              }


            }
          })
        }
      }else{
        filter.checked = true
      }

      if(filter.organizations && filter.organizations.length > 0){
        filter.organizations.map(organization => {
          organization.checked = true
        })
      }

      if(old_filters[filterName].length > 0){
        for(var i =0; i < old_filters[filterName].length; i++){
          if(old_filters[filterName][i].id == filter.id){

            if(filterName == 'formulations'){
              for(var i=0;i<new_filters[filterName].length;i++){
                Object.keys(new_filters[filterName][i]).map(prop => {
                  for(var j=0;j<new_filters[filterName][i][prop].length;j++){




                    // NEW
                    // new_filters[filterName][i][prop][j].checked = old_filters[filterName][i][prop][j].checked
                    for(const oldFilterProp of old_filters[filterName][i][prop]){
                      if(oldFilterProp.id == new_filters[filterName][i][prop][j].id){
                        new_filters[filterName][i][prop][j].checked = oldFilterProp.checked
                      }
                    }







                    if(new_filters[filterName][i][prop][j].dosages){
                      for(var k=0;k<new_filters[filterName][i][prop][j].dosages.length;k++){

                        // NEW
                        // new_filters[filterName][i][prop][j].dosages[k].checked = old_filters[filterName][i][prop][j].dosages[k].checked
                        for(const oldFilterPropDosage of old_filters[filterName][i][prop][j].dosages){
                          if(oldFilterPropDosage.id == new_filters[filterName][i][prop][j].dosages[k].id){
                            new_filters[filterName][i][prop][j].dosages[k].checked = oldFilterPropDosage.checked
                          }
                        }




                      }
                    }

                  }
                })
              }
            }else{
              filter.checked = old_filters[filterName][i].checked
            }

            if(filter.organizations && filter.organizations.length > 0){
              filter.organizations.map(organization => {
                for(var j=0; j < old_filters[filterName][i].organizations.length; j++){
                  if(old_filters[filterName][i].organizations[j].organizationId == organization.organizationId){
                      organization.checked = old_filters[filterName][i].organizations[j].checked
                  }
                }
              })
            }

          }
        }
      }

    })
  })

  return new_filters;
};

export default (state = initialState, action) => {
  const {
    error,
    payload,
    type,
  } = action;

  switch (type) {
    case FETCH_GEO_JSON_REQUEST: {
      return {
        ...state,
        geoJSON: {
          ...state.geoJSON,
          isFetching: state.geoJSON.isFetching + 1,
        },
      };
    }
    case FETCH_GEO_JSON_SUCCESS: {
      return {
        ...state,
        geoJSON: {
          ...state.geoJSON,
          isFetching: state.geoJSON.isFetching - 1,
          data: payload,
        },
      };
    }
    case FETCH_GEO_JSON_FAILURE: {
      return {
        ...state,
        geoJSON: {
          ...state.geoJSON,
          isFetching: state.geoJSON.isFetching - 1,
        },
      };
    }
    case FETCH_FILTERS_REQUEST: {
      return {
        ...state,
        filters: {
          ...state.filters,
          isFetching: true,
        },
      };
    }
    case FETCH_FILTERS_SUCCESS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          isFetching: false,
          list: mergeFilters(state.filters.list, payload),
        },
      };
    }
    case FETCH_FILTERS_FAILURE: {
      return {
        ...state,
        error: error,
        filters: {
          ...state.filters,
          isFetching: false,
        },
      };
    }
    default:
      return state;
  }
};
