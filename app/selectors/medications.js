const activeFormulations = (filters) => {
  const drugTypes = filters.drugTypes;
  const formulations = filters.formulations;

  if(!formulations || formulations.length == 0){
    return false
  }

  let activeFormulations = formulations.find(medication => {
    let selectedDrugTypesArray = []
    for(const drugType of drugTypes){
      if(drugType.checked){
        selectedDrugTypesArray.push(drugType.id);
      }
    }

    if(medication.medicationTypes.length != selectedDrugTypesArray.length){
      return false;
    }

    for(const medicationType of medication.medicationTypes){
      if(selectedDrugTypesArray.indexOf(medicationType.id) == -1){
        return false;
      }
    }
    return true;
  });

  return activeFormulations ? activeFormulations : false
}

const spreadDosagesAccrossAllMedicationTypes = (filters, dosages) => {
  if(dosages === undefined){
    return filters
  }

  let dosageObj = {}
  for(var i=0;i<dosages.length;i++){
    dosageObj[dosages[i].id] = dosages[i].checked
  }

  if(filters && filters.dosages){
    for(var k=0;k<filters.dosages.length;k++){
      filters.dosages[k].checked = dosageObj[filters.dosages[k].id]
    }
  }

  for(var i=0;i<filters.formulations.length;i++){
    for(var j=0;j<filters.formulations[i].medicationDosages.length;j++){
      const currentDosageId = filters.formulations[i].medicationDosages[j].id;
      if(dosageObj[currentDosageId] !== undefined){
        filters.formulations[i].medicationDosages[j].checked = dosageObj[currentDosageId]
      }
    }
  }

  return filters
}

const getFilters = (state) => {
    let filters = state.medications.filters.list
    const active_formulation = activeFormulations(filters)
    filters = spreadDosagesAccrossAllMedicationTypes(filters, state.filters.dosages)

    filters.dosages = []
    if(active_formulation){
      for(const medicationName of active_formulation.medicationNames){
        if(medicationName.id == state.filters.activeMedication){
          filters.dosages = medicationName.dosages;
        }
      }
    }

    return filters
}

const medicationsSelectors = {
  getGeoJSON: state => {
    if(!state.medications.geoJSON.data){
      return {
        center: {type: "Point", coordinates: [-98.579561, 39.828194]},
        coordinates: [-98.579561, 39.828194],
        type: 'Point',
        features: [],
        type: "FeatureCollection",
        zoom: 3
      }
    }
    return state.medications.geoJSON.data;
  },
  getError: state => state.medications.error,
  getFilters: state => getFilters(state),
  getMedications: state => {
    const formulations = activeFormulations(state.medications.filters.list)
    return formulations ? formulations.medicationNames : []
  },
  loadingGeoJSON: state => state.medications.geoJSON.isFetching,
};

export default medicationsSelectors;
