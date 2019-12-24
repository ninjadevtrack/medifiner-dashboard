import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Modal from 'react-modal';

import Button from '@common/components/Button';
import Datepicker from '@common/components/Datepicker';
import Loader from '@common/components/Loader';

import './styles.scss';

export default class ExportModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAllFilters: false,
    };

    this.onFiltersToggle = this.onFiltersToggle.bind(this);

    Modal.setAppElement('body');
  }

  onFiltersToggle() {
    this.setState(prevState => ({
      showAllFilters: !prevState.showAllFilters,
    }));
  }

  parseFilters(list, name) {
    if (!list.length) {
      return '-';
    }

    return list.reduce((prev, cur) => {
      if (prev) {
        return `${prev}, ${cur[name]}`;
      }

      return cur[name];
    }, '');
  }

  render() {
    const { showAllFilters } = this.state;
    const {
      activeDate,
      activeMedication,
      activeStateItem,
      activeZipCode,
      displayFileByEmail,
      loading,
      filters,
      medications,
      onDateChange,
      onDownloadClick,
      onModalClose,
      showModal,
      disableDownload,
      states,
    } = this.props;
    const activeMedicationObj = medications.find(medication => medication.id === activeMedication) || {};
    let activeLocation = 'United States';
    if (activeZipCode) {
      activeLocation = activeZipCode;
    } else if (activeStateItem && states.length) {
      activeLocation = states.find(state => state.id === activeStateItem).stateName;
    }

    let activeDosages = filters.dosages.map(dosage => { if(dosage.checked){ return dosage.name } }).join(', ');
    let activePharmacyCategories = filters.providerCategories.map(category => { if(category.checked){ return category.name } }).join(', ');
    let activeProviderTypes = filters.providerTypes.map(type => { if(type.checked){ return type.name } }).join(', ');
    let activeDrugTypes = filters.drugTypes.map(type => { if(type.checked){ return type.name } }).join(', ');

    return (
      <Modal
        shouldCloseOnEsc
        isOpen={showModal}
        portalClassName="export-modal"
        overlayClassName="export-modal__overlay"
        className="export-modal__content"
        onRequestClose={onModalClose}
      >
        <button
          type="button"
          className="export-modal__close-button"
          onClick={onModalClose}
        >
          <i className="fas fa-times-circle" />
        </button>
        <p className="export-modal__title">CSV Export</p>
        <div className="export-modal__datepicker">
          <p className="export-modal__datepicker-label">
            Select a start date for a week
          </p>
          <div className="export-modal__start-date">
            <Datepicker
              defaultDate={activeDate.format('MM/DD/YYYY')}
              daysRange={6}
              onChange={onDateChange}
            />
          </div>
          <div className="export-modal__end-date">
            &nbsp;to {activeDate.clone().add(6, 'days').format('MM/DD/YYYY')}
          </div>
        </div>
        <div className="export-modal__download-button-container">
          {!!!loading && (
            <Button
              disabled={!activeMedicationObj.name || disableDownload}
              onClick={onDownloadClick}
            >
              <i className="fas fa-file-download export-modal__download-button-icon" />
              Download File
            </Button>
          )}
          {loading && (
            <Loader className="loader__center"  />
          )}
          {displayFileByEmail &&(
            <p>A link to download the CSV File will be sent to your inbox</p>
          )}
        </div>
        <p className="export-modal__disclaimer">
          Note - The downloaded file will have the following filters applied:
        </p>
        <ul className={classNames('export-modal__filters', { 'export-modal__filters--show-all': showAllFilters })}>
          <li className="export-modal__filter">
            <span className="export-modal__filter-name">Antiviral Drug:</span>&nbsp;
            {activeMedicationObj.name || '-'}
          </li>
          <li className="export-modal__filter">
            <span className="export-modal__filter-name">Location:</span>&nbsp;
            {activeLocation}
          </li>
          <li className="export-modal__filter">
            <span className="export-modal__filter-name">Dosages:</span>&nbsp;
            {activeDosages}
          </li>
          <li className="export-modal__filter">
            <span className="export-modal__filter-name">Pharmacy Category:</span>&nbsp;
            {activePharmacyCategories}
          </li>
          <li className="export-modal__filter">
            <span className="export-modal__filter-name">Pharmacy Provider:</span>&nbsp;
            {activeProviderTypes}
          </li>
          <li className="export-modal__filter">
            <span className="export-modal__filter-name">Other Filters:</span>&nbsp;
            {activeDrugTypes}
          </li>
        </ul>
        <div className="export-modal__show-all">
          <div className="row">
            <div className="export-modal__show-all-container">
              <button
                type="button"
                className="export-modal__show-all-button"
                onClick={this.onFiltersToggle}
              >
                {showAllFilters ? 'View Less Filters' : 'View All Filters'}
                <i
                  className={classNames('export-modal__show-all-icon fas', {
                    'fa-angle-down': !showAllFilters,
                    'fa-angle-up': showAllFilters,
                  })}
                />
              </button>
            </div>
            <p className="export-modal__show-all-text">
              To modify the filters, please exit the modal and use the in-page filters.
            </p>
          </div>
        </div>
      </Modal>
    );
  }
}

ExportModal.propTypes = {
  activeDate: PropTypes.shape({}).isRequired,
  activeMedication: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeStateItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeZipCode: PropTypes.string,
  displayFileByEmail: PropTypes.bool.isRequired,
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
  loading: PropTypes.bool.isRequired,
  medications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  onDateChange: PropTypes.func.isRequired,
  onDownloadClick: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  states: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    stateName: PropTypes.string,
    stateCode: PropTypes.string,
  })).isRequired,
};

ExportModal.defaultProps = {
  activeMedication: null,
  activeStateItem: null,
  activeZipCode: null,
  displayFileByEmail: false,
  loading: false,
};
