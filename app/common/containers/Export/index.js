import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';

import { toSnakeCase } from 'case-converter';
import qs from 'qs';

import Button from '@common/components/Button';
import ExportModal from '@common/components/ExportModal';
import moment from 'moment';

import getActiveFilters from '@app/selectors/active_filters';
import filtersSelectors from '@selectors/filters';
import globalSelectors from '@app/selectors/global';
import medicationsSelectors from '@app/selectors/medications';

import env from '@app/utils/env';

import './styles.scss';

class ExportContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDate: moment().subtract(6, 'days'),
      downloadingCsv: false,
      showModal: false,
      fileWillBeReady: false,
      disableDownload: false
    };

    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onModalOpen() {
    this.setState({
      showModal: true,
    });
  }

  onModalClose() {
    this.setState({
      showModal: false,
    });
  }

  onDownloadClick() {
    const { activeDate } = this.state;
    const {
      activeMedication,
      activeStateItem,
      activeZipCode,
      downloadingCsv,
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

    let typeString = '';
    if (type) {
      typeString = `${type}/${typeValue}/`;
    }
    const params = {
      endDate: activeDate.clone().add(6, 'days').format('YYYY-MM-DD'),
      medId: activeMedication,
      startDate: activeDate.format('YYYY-MM-DD'),
      typeValue,
      ...activeFilters,
    };

    let csv_export_download_url = `${env.BACKEND_URL}v1/medications/csv_export/${typeString}`;

    this.setState({
      downloadingCsv: true,
      fileWillBeReady: false,
      disableDownload: true
    });

    return axios
          .get(csv_export_download_url, { params })
          .then(response => response.data)
          .then((response) => {
            const file_url = response.fileUrl;
            console.log(file_url)
            this.setState({
              downloadingCsv: false,
              fileWillBeReady: true,
            });
          });
  }

  onDateChange(date) {
    this.setState({
      activeDate: moment(date, 'MM/DD/YYYY'),
    });
  }

  render() {
    const {
      activeDate,
      downloadingCsv,
      fileWillBeReady,
      showModal,
      disableDownload
    } = this.state;
    const {
      activeDetailedFilters,
      activeMedication,
      activeStateItem,
      activeZipCode,
      downloading,
      filters,
      medications,
      states,
    } = this.props;

    return (
      <div className="export">
        <Button
          secondary
          onClick={this.onModalOpen}
        >
          <i className="fas fa-external-link-alt export__button-icon" />
          Export CSV
        </Button>
        <ExportModal
          showModal={showModal}
          disableDownload={disableDownload}
          activeDate={activeDate}
          activeDetailedFilters={activeDetailedFilters}
          activeMedication={activeMedication}
          activeStateItem={activeStateItem}
          activeZipCode={activeZipCode}
          loading={downloadingCsv}
          displayFileByEmail={fileWillBeReady}
          filters={filters}
          medications={medications}
          states={states}
          onDownloadClick={this.onDownloadClick}
          onModalClose={this.onModalClose}
          onDateChange={this.onDateChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeMedication: filtersSelectors.getFilter(state, 'activeMedication'),
  activeStateItem: filtersSelectors.getFilter(state, 'activeStateItem'),
  activeZipCode: filtersSelectors.getFilter(state, 'activeZipCode'),
  filters: medicationsSelectors.getFilters(state),
  medications: medicationsSelectors.getMedications(state),
  states: globalSelectors.getStates(state),
});

ExportContainer.propTypes = {
  activeMedication: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeStateItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeZipCode: PropTypes.string,
  drugTypes: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    drugTypeVerbose: PropTypes.string,
    drugType: PropTypes.string,
  })),
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
  medications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  providerCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
    providersCount: PropTypes.number,
  })),
  providerTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
    providersCount: PropTypes.number,
  })),
  states: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    stateName: PropTypes.string,
    stateCode: PropTypes.string,
  })).isRequired,
};

ExportContainer.defaultProps = {
  activeDetailedFilters: null,
  activeMedication: null,
  activeStateItem: null,
  activeZipCode: null,
  drugTypes: null,
  providerCategories: null,
  providerTypes: null,
};

export default connect(mapStateToProps)(ExportContainer);
