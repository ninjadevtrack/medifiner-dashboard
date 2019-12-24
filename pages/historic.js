import React, { Component } from 'react';
import Head from 'next/head';

import moment from 'moment';

import getActiveFilters from '@app/selectors/active_filters';

import HistoricViewContainer from '@routes/Historic/containers/HistoricView';

import {
  fetchAverageData,
  fetchOverallData,
} from '@actions/historic';

import filtersSelectors from '@app/selectors/filters';
import medicationsSelectors from '@app/selectors/medications';

class Page extends Component {
  static isRestricted = true

  static displayName = 'HistoricPage'

  static async getInitialProps({ store }) {
    const state = store.getState();
    const activeDate = filtersSelectors.getFilter(state, 'activeDate');
    const filters = medicationsSelectors.getFilters(state);
    const activeMedication = filtersSelectors.getFilter(state, 'activeMedication');
    const activeStateItem = filtersSelectors.getFilter(state, 'activeStateItem');
    const activeZipCode = filtersSelectors.getFilter(state, 'activeZipCode');
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

    Promise.all([
      fetchAverageData(type, {
        medId: activeMedication,
        typeValue,
        ...activeFilters,
        startDate: moment(activeDate, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        endDate: moment(activeDate, 'MM/DD/YYYY').add('13', 'days').format('YYYY-MM-DD'),
      })(store.dispatch),
      fetchOverallData(type, {
        medId: activeMedication,
        typeValue,
        ...activeFilters,
        startDate: moment(activeDate, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        endDate: moment(activeDate, 'MM/DD/YYYY').add('13', 'days').format('YYYY-MM-DD'),
      })(store.dispatch),
    ]);

    return {};
  }

  render() {
    return (
      <div>
        <Head>
          <title key="title">Historic View - MedFinder</title>
        </Head>
        <HistoricViewContainer />
      </div>
    );
  }
}

export default Page;
