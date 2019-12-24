import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import FilterCategory from '@common/components/FilterCategory';

import {
  fetchFilters,
  fetchDrugTypes,
  fetchProviderCategories,
  fetchProviderTypes,
} from '@actions/medications';

import { updateFilter } from '@actions/filters';

import authSelectors from '@selectors/auth';
import activeFilterNames from '@app/selectors/active_filter_names';
import getActiveFilters from '@app/selectors/active_filters';
import filtersSelectors from '@app/selectors/filters';
import medicationsSelectors from '@app/selectors/medications';

import './styles.scss';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {
    this.fetchFiltersData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.activeMedication !== this.props.activeMedication ||
      prevProps.activeStateItem !== this.props.activeStateItem ||
      prevProps.activeZipCode !== this.props.activeZipCode ||
      prevProps.mapDate !== this.props.mapDate
    ) {
      this.fetchFiltersData();
    }
  }

  onFilterChange(filterName, filter) {
    let {
      filters,
    } = this.props;

    this.props.updateFilter(filters);
    this.setState({filters: filters});
    this.fetchFiltersData();
  }

  fetchFiltersData() {
    const {
      activeDate,
      activeMedication,
      activeStateItem,
      activeZipCode,
      filters,
      mapDate,
      mapDateParam,
      me,
    } = this.props;

    const activeFilters = getActiveFilters(filters)

    let filtersParams = {
      medId: activeMedication,
      stateId: activeZipCode ? null : activeStateItem,
      zipcode: activeZipCode,
      ...activeFilters,
    }

    if(mapDateParam){
      filtersParams.mapDate = moment(mapDate, 'MM/DD/YYYY').format('YYYY-MM-DD')
    }else{
      filtersParams.startDate = moment(activeDate, 'MM/DD/YYYY').format('YYYY-MM-DD')
      filtersParams.endDate = moment(activeDate, 'MM/DD/YYYY').add('13', 'days').format('YYYY-MM-DD')
    }

    this.props.fetchFilters(filtersParams);
  }

  render() {
    const {
      activeFilterNames,
      filters,
    } = this.props;

    return (
      <div className="filters">
        <div className="filters__title">
          <p className="filters__title-text">
            Filters
          </p>
        </div>
        <div className="filters__container">
          {activeFilterNames.map(filterName =>
            <FilterCategory
              key={filterName}
              filters={filters[filterName]}
              filterCategoryName={filterName}
              onFilterChange={this.onFilterChange}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeDate: filtersSelectors.getFilter(state, 'activeDate'),
  activeFilterNames: activeFilterNames(),
  activeMedication: filtersSelectors.getFilter(state, 'activeMedication'),
  activeStateCategory: filtersSelectors.getFilter(state, 'activeStateCategory'),
  activeStateItem: filtersSelectors.getFilter(state, 'activeStateItem'),
  activeZipCode: filtersSelectors.getFilter(state, 'activeZipCode'),
  filters: medicationsSelectors.getFilters(state),
  mapDate: filtersSelectors.getFilter(state, 'mapDate'),
  me: authSelectors.getMe(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchFilters,
  updateFilter,
}, dispatch);

Filters.propTypes = {
  activeDate: PropTypes.string,
  activeFilterNames: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ),
  activeMedication: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  activeStateItem: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  activeZipCode: PropTypes.string,
  fetchFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    dosages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    drugTypes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    formulations: PropTypes.arrayOf(PropTypes.shape({
      medication_dosages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })),
      medication_names: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })),
      medication_types: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })),
    })),
    providerCategories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      organizations: PropTypes.arrayOf(PropTypes.shape({
        disabled: PropTypes.bool.isRequired,
        organizationId: PropTypes.number.isRequired,
        organizationName: PropTypes.string.isRequired,
        providersCount: PropTypes.number.isRequired,
      })),
      providersCount: PropTypes.number.isRequired,
    })),
    providerTypes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      providersCount: PropTypes.number.isRequired,
    }))
  }).isRequired,
  mapDate: PropTypes.string.isRequired,
  mapDateParam: PropTypes.bool.isRequired,
  me: PropTypes.shape({
    permissionLevel: PropTypes.string,
    state: PropTypes.number,
  }).isRequired,
  updateFilter: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  activeDate: null,
  activeMedication: null,
  activeStateItem: null,
  activeZipCode: null,
  filters: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filters);
