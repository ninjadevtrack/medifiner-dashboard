const historicsSelectors = {
  fetchingAverageData: state => state.historic.average.isFetching,
  fetchingOverallData: state => state.historic.overall.isFetching,
  getAverageData: state => {
    if(Object.keys(state.historic.average.data).length == 0){
      return {
          medicationSupplies: []
      };
    }
    return state.historic.average.data;
  },
  getOverallData: state => {
    if(Object.keys(state.historic.overall.list).length == 0){
      return {
          medicationSupplies: []
      };
    }
    return state.historic.overall.list
  },
};

export default historicsSelectors;
