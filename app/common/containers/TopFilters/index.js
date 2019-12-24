import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change, stopSubmit } from 'redux-form';
import PropTypes from 'prop-types';

import Datepicker from '@common/components/Datepicker';
import Dropdown from '@common/components/Dropdown';
import ZipCodeForm from '@common/components/ZipCodeForm';

import { fetchStates } from '@actions/global';
import { updateFilter } from '@actions/filters';

import filtersSelectors from '@selectors/filters';
import globalSelectors from '@app/selectors/global';
import medicationsSelectors from '@selectors/medications';

import './styles.scss';

class TopFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      medicationsList: [],
      statesList: [],
    };

    this.onMedicationClick = this.onMedicationClick.bind(this);
    this.onStateCategoryClick = this.onStateCategoryClick.bind(this);
    this.onStateItemClick = this.onStateItemClick.bind(this);
    this.onZipCodeSubmit = this.onZipCodeSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onMapDateChange = this.onMapDateChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchStates({ ordering: 'name' });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.medications !== this.props.medications) {
      this.parseMedications();
    }
    if (prevProps.states !== this.props.states) {
      this.parseStates();
    }

    // Allows to change value in dropdown depending on drug types filter
    const med_ids = this.props.medications.map(medication => medication.id)
    if(this.props.activeMedication && med_ids.indexOf(this.props.activeMedication) == -1){
      this.setEquivalentActiveMedication()
    }

    if (prevProps.error !== this.props.error &&
      this.props.error.request &&
      this.props.error.request.responseURL &&
      this.props.error.request.responseURL.indexOf('zipcode') > -1 &&
      this.props.error.request.responseURL.indexOf('medications/filters') > -1
    ) {
      this.props.stopFormSubmit('zipCode', { zipcode: 'Please enter a valid zip code' });
    }
  }

  setEquivalentActiveMedication() {
    let equivalent_med_id = false;
    for(var i=0; i<this.props.medications.length;i++){
      if(this.props.medications[i].equivalentMedicationNameIds.indexOf(this.props.activeMedication) > -1){
        equivalent_med_id = this.props.medications[i].id;
      }
    }

    if(equivalent_med_id){
      this.props.updateFilter({ activeMedication: equivalent_med_id });
    }
  }

  onMedicationClick(name) {
    this.props.updateFilter({ activeMedication: name });
  }

  onStateCategoryClick(name) {
    this.props.changeFormField('zipCode', 'zipcode', null);
    this.props.updateFilter({
      activeStateCategory: name,
      activeStateItem: null,
      activeZipCode: null,
    });
  }

  onStateItemClick(name) {
    this.props.changeFormField('zipCode', 'zipcode', null);
    this.props.updateFilter({
      activeStateItem: name,
      activeZipCode: null,
    });
  }

  onZipCodeSubmit(values) {
    this.props.updateFilter({ activeZipCode: values.zipcode });
  }

  onDateChange(date) {
    this.props.updateFilter({ activeDate: date });
  }

  onMapDateChange(date) {
    this.props.updateFilter({ mapDate: date });
  }

  parseMedications() {
    const medicationsList = this.props.medications.map(medication => ({
      category: {
        name: medication.id,
        title: medication.name,
      },
    }));

    this.setState({
      medicationsList,
    });
  }

  parseStates() {
    const states = this.props.states.map(state => ({
      name: state.id,
      title: state.stateName,
    }));
    const statesList = [{
      category: {
        name: 'usa',
        title: 'United States',
      },
      items: states,
    }];

    this.setState({
      statesList,
    }, () => {
      this.props.updateFilter({ activeStateCategory: 'usa' });
    });
  }

  render() {
    const {
      activeDate,
      activeMedication,
      activeStateCategory,
      activeStateItem,
      mapDate,
      showDatepicker,
    } = this.props;
    const {
      statesList,
      medicationsList,
    } = this.state;

    return (
      <div className="top-filters">
        <div className="top-filters__row clearfix">
          <div className="top-filters__column">
            <Dropdown
              placeholder="Select Medication"
              activeCategory={activeMedication}
              activeValue={activeMedication}
              label="Average Supply Levels of"
              onItemClick={this.onMedicationClick}
              options={medicationsList}
            />
          </div>
          <div className="top-filters__column">
            <Dropdown
              activeCategory={activeStateCategory}
              activeValue={activeStateItem}
              label="Show in"
              onCategoryClick={this.onStateCategoryClick}
              onItemClick={this.onStateItemClick}
              options={statesList}
            />
          </div>
          <div className="top-filters__column">
            <ZipCodeForm onSubmit={this.onZipCodeSubmit} />
          </div>
          {showDatepicker && (
            <div className="top-filters__column">
              <Datepicker
                label="Start Date (shows 2 weeks)"
                defaultDate={activeDate}
                daysRange={13}
                onChange={this.onDateChange}
              />
            </div>
          )}
          {!showDatepicker && (
            <div className="top-filters__column">
              <Datepicker
                closeOnSelect={true}
                label="Date"
                defaultDate={mapDate}
                daysRange={0}
                onChange={this.onMapDateChange}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeDate: filtersSelectors.getFilter(state, 'activeDate'),
  activeMedication: filtersSelectors.getFilter(state, 'activeMedication'),
  activeStateCategory: filtersSelectors.getFilter(state, 'activeStateCategory'),
  activeStateItem: filtersSelectors.getFilter(state, 'activeStateItem'),
  error: medicationsSelectors.getError(state),
  mapDate: filtersSelectors.getFilter(state, 'mapDate'),
  medications: medicationsSelectors.getMedications(state),
  states: globalSelectors.getStates(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeFormField: (formName, field, value) => change(formName, field, value),
  fetchStates,
  stopFormSubmit: (formName, errors) => stopSubmit(formName, errors),
  updateFilter,
}, dispatch);

TopFilters.propTypes = {
  activeDate: PropTypes.string.isRequired,
  activeMedication: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeStateCategory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeStateItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  changeFormField: PropTypes.func.isRequired,
  error: PropTypes.shape({}),
  fetchStates: PropTypes.func.isRequired,
  mapDate: PropTypes.string.isRequired,
  medications:  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  showDatepicker: PropTypes.bool.isRequired,
  states: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    stateName: PropTypes.string,
    stateCode: PropTypes.string,
  })).isRequired,
  updateFilter: PropTypes.func.isRequired,
};

TopFilters.defaultProps = {
  activeMedication: null,
  activeStateCategory: null,
  activeStateItem: null,
  error: {},
  filters: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopFilters);
