import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stopSubmit } from 'redux-form';
import PropTypes from 'prop-types';

import moment from 'moment';

import MapLegend from '@common/components/MapLegend';

import getActiveFilters from '@app/selectors/active_filters';
import medicationsSelectors from '@selectors/medications';

import AverageSupplyLevel from '@routes/Historic/components/AverageSupplyLevel';
import OverallSupplyLevels from '@routes/Historic/components/OverallSupplyLevels';

import {
  fetchAverageData,
  fetchOverallData,
} from '@actions/historic';
import { updateFilter } from '@actions/filters';

import filtersSelectors from '@app/selectors/filters';
import historicSelectors from '@app/selectors/historic';

import '@routes/Historic/styles/HistoricView.scss';

class HistoricView extends Component {
  componentDidUpdate(prevProps) {
    if (
      (
        prevProps.activeDate !== this.props.activeDate ||
        prevProps.activeMedication !== this.props.activeMedication ||
        prevProps.activeStateItem !== this.props.activeStateItem ||
        prevProps.activeZipCode !== this.props.activeZipCode ||
        prevProps.filters !== this.props.filters
      ) && prevProps.activeMedication
    ) {
      this.fetchData();
    }
  }

  fetchData() {
    const {
      activeDate,
      activeMedication,
      activeStateItem,
      activeZipCode,
      filters,
    } = this.props;
    let type = '';
    let typeValue;
    if (activeStateItem && !activeZipCode) {
      type = 'state';
      typeValue = activeStateItem;
    } else if (activeZipCode) {
      type = 'zipcode';
      typeValue = activeZipCode;
    }

    const activeFilters = getActiveFilters(filters);

    this.props
      .fetchAverageData(type, {
        medId: activeMedication,
        typeValue,
        ...activeFilters,
        startDate: moment(activeDate, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        endDate: moment(activeDate, 'MM/DD/YYYY').add('13', 'days').format('YYYY-MM-DD'),
      })
      .then((responseData) => {
        if (type === 'zipcode') {
          this.props.updateFilter({ activeStateItem: responseData.state });
        }

        // Trigger window resize for filters
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
      })
      .catch((error) => {
        if (error.message !== 'cancel|' && type === 'zipcode') {
          this.props.stopFormSubmit('zipCode', { zipcode: 'Please enter a valid zip code' });
        }
      });

    this.props
      .fetchOverallData(type, {
        medId: activeMedication,
        typeValue,
        ...activeFilters,
        startDate: moment(activeDate, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        endDate: moment(activeDate, 'MM/DD/YYYY').add('13', 'days').format('YYYY-MM-DD'),
      })
      .then((responseData) => {
        if (type === 'zipcode') {
          this.props.updateFilter({ activeStateItem: responseData.state });
        }

        // Trigger window resize for filters
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
      })
      .catch((error) => {
        if (error.message !== 'cancel|' && type === 'zipcode') {
          this.props.stopFormSubmit('zipCode', { zipcode: 'Please enter a valid zip code' });
        }
      });
  }

  render() {
    const {
      averageData,
      loadingAverage,
      loadingOverall,
      overallData,
    } = this.props;

    return (
      <div className="historic-view">
        <div className="historic-view__section">
          <AverageSupplyLevel data={averageData.medicationSupplies} loading={loadingAverage} />
        </div>
        <div className="historic-view__section">
          <OverallSupplyLevels data={overallData.medicationSupplies} loading={loadingOverall} />
        </div>
        <div className="historic-view__legend">
          <MapLegend />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeDate: filtersSelectors.getFilter(state, 'activeDate'),
  activeMedication: filtersSelectors.getFilter(state, 'activeMedication'),
  activeStateItem: filtersSelectors.getFilter(state, 'activeStateItem'),
  activeZipCode: filtersSelectors.getFilter(state, 'activeZipCode'),
  averageData: historicSelectors.getAverageData(state),
  filters: medicationsSelectors.getFilters(state),
  overallData: historicSelectors.getOverallData(state),
  loadingAverage: historicSelectors.fetchingAverageData(state),
  loadingOverall: historicSelectors.fetchingOverallData(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAverageData,
  fetchOverallData,
  stopFormSubmit: (formName, errors) => stopSubmit(formName, errors),
  updateFilter,
}, dispatch);

HistoricView.propTypes = {
  activeDate: PropTypes.string,
  activeMedication: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  activeStateItem: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  activeZipCode: PropTypes.string,
  averageData: PropTypes.shape({
    medicationSupplies: PropTypes.arrayOf(PropTypes.shape({
      averageSupplyPerDay: PropTypes.arrayOf(PropTypes.shape({
        day: PropTypes.string,
        supply: PropTypes.array,
      })),
      name: PropTypes.string,
    })).isRequired,
    state: PropTypes.number,
  }).isRequired,
  fetchAverageData: PropTypes.func.isRequired,
  fetchOverallData: PropTypes.func.isRequired,
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
  overallData: PropTypes.shape({
    medicationSupplies: PropTypes.arrayOf(PropTypes.shape({
      averageSupplyPerDay: PropTypes.arrayOf(PropTypes.shape({
        day: PropTypes.string,
        supply: PropTypes.array,
      })),
      name: PropTypes.string,
    })).isRequired,
    state: PropTypes.number,
  }).isRequired,
  loadingAverage: PropTypes.bool.isRequired,
  loadingOverall: PropTypes.bool.isRequired,
  stopFormSubmit: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
};

HistoricView.defaultProps = {
  activeDate: null,
  activeMedication: null,
  activeStateItem: null,
  activeZipCode: null,
  filters: null,
  loadingAverage: false,
  loadingOverall: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoricView);
