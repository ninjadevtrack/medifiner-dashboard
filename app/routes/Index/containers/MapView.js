import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  change,
  stopSubmit,
} from 'redux-form';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import Loader from '@common/components/Loader';
import MapLegend from '@common/components/MapLegend';

import { fetchGeoJSON } from '@actions/medications';
import { updateFilter } from '@actions/filters';

import getActiveFilters from '@app/selectors/active_filters';
import filtersSelectors from '@selectors/filters';
import medicationsSelectors from '@selectors/medications';

import '@common/components/Map/styles.scss';
import '@common/components/MapPopup/styles.scss';
import '@routes/Index/styles/MapView.scss';
import authSelectors from '@app/selectors/auth';

const MapComponent = dynamic(import('@common/components/Map'), {
  ssr: false,
});

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupProperties: null,
    };

    this.onPopupButtonClick = this.onPopupButtonClick.bind(this);
    this.onPopupClose = this.onPopupClose.bind(this);
    this.onPopupOpen = this.onPopupOpen.bind(this);
  }

  componentDidMount() {
    this.fetchGeoJSON();
  }

  componentDidUpdate(prevProps) {
    if (
      ( prevProps.filters !== this.props.filters ||
        prevProps.activeMedication !== this.props.activeMedication ||
        prevProps.activeStateItem !== this.props.activeStateItem ||
        prevProps.activeZipCode !== this.props.activeZipCode ||
        prevProps.mapDate !== this.props.mapDate
      ) && prevProps.activeMedication
    ) {
      this.fetchGeoJSON();
    }
    if (prevProps.geoJSON !== this.props.geoJSON) {
      this.setPopup();
    }
  }

  onStateCategoryClick() {
    this.props.changeFormField('mapViewZipCode', 'zipcode', null);
    this.props.updateFilter({
      activeStateItem: null,
      activeZipCode: null,
    });

    this.setState({
      popupProperties: null,
    });
  }

  onStateItemClick(name) {
    this.props.changeFormField('mapViewZipCode', 'zipcode', null);
    this.props.updateFilter({ activeStateItem: name });
  }

  onPopupButtonClick(geoType, id) {
    const { geoJSON } = this.props;

    if (geoType === 'country') {
      this.onStateItemClick(id, false);
    } else if (geoType === 'state' && id) {
      this.onStateCategoryClick('usa', false);
    } else if (geoType === 'county') {
      this.onStateItemClick(id, false);
      this.setState({
        popupProperties: geoJSON.state,
      });
    } else {
      this.props.changeFormField('zipCode', 'zipcode', null);
      this.onStateCategoryClick('usa', false);
    }
  }

  onPopupClose() {
    this.onStateCategoryClick();
  }

  onPopupOpen(popupProperties) {
    this.setState({
      popupProperties,
    });
  }

  getGeoType() {
    const {
      activeStateItem,
      activeZipCode,
    } = this.props;

    if (activeZipCode) {
      return 'zipcode';
    }
    if (activeStateItem) {
      return 'state';
    }

    return 'country';
  }

  setPopup() {
    const {
      activeStateItem,
      activeZipCode,
      geoJSON,
    } = this.props;

    if (activeZipCode) {
      this.setState({
        popupProperties: geoJSON.properties,
      });
    } else if (!activeZipCode && activeStateItem) {
      this.setState({
        popupProperties: geoJSON.state,
      });
    } else if (!activeStateItem && this.state.popupProperties) {
      this.setState({
        popupProperties: null,
      });
    }
  }

  fetchGeoJSON() {
    const {
      activeMedication,
      activeStateItem,
      activeZipCode,
      filters,
      mapDate,
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
      .fetchGeoJSON(type, {
        medId: activeMedication,
        typeValue,
        ...activeFilters,
        mapDate: moment(mapDate, 'MM/DD/YYYY').format('YYYY-MM-DD'),
      })
      .then((responseData, status) => {
        if (responseData && type === 'zipcode') {
          this.props.updateFilter({ activeStateItem: responseData.properties.state.id });
        }
      })
      .catch((error) => {
        if (error.message !== 'cancel|' && type === 'zipcode') {
          this.props.stopFormSubmit('zipCode', { zipcode: 'Please enter a valid zip code' });
        }
      });
  }

  render() {
    const {
      geoJSON,
      loading,
      me,
    } = this.props;
    const { popupProperties } = this.state;
    const geoType = this.getGeoType();

    return (
      <div className="map-view">
        <div className="map-view__map">
          {loading > 0 && (<div className="loader-background"></div>)}
          {loading > 0 && (<Loader className="loader__on_top loader__full_screen" />)}
          {geoJSON.center && (
            <MapComponent
              data={geoJSON}
              me={me}
              geoType={geoType}
              popupProperties={popupProperties}
              onPopupButtonClick={this.onPopupButtonClick}
              onPopupClose={this.onPopupClose}
              onPopupOpen={this.onPopupOpen}
            />
          )}
        </div>
        <div className="map-view__legend">
          <MapLegend />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: medicationsSelectors.getFilters(state),
  activeMedication: filtersSelectors.getFilter(state, 'activeMedication'),
  activeStateItem: filtersSelectors.getFilter(state, 'activeStateItem'),
  activeZipCode: filtersSelectors.getFilter(state, 'activeZipCode'),
  geoJSON: medicationsSelectors.getGeoJSON(state),
  loading: medicationsSelectors.loadingGeoJSON(state),
  mapDate: filtersSelectors.getFilter(state, 'mapDate'),
  me: authSelectors.getMe(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeFormField: (formName, field, value) => change(formName, field, value),
  fetchGeoJSON,
  stopFormSubmit: (formName, errors) => stopSubmit(formName, errors),
  updateFilter,
}, dispatch);

MapView.propTypes = {
  activeMedication: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  activeStateItem: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  activeZipCode: PropTypes.string,
  changeFormField: PropTypes.func.isRequired,
  fetchGeoJSON: PropTypes.func.isRequired,
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
  geoJSON: PropTypes.shape({}).isRequired,
  mapDate: PropTypes.string.isRequired,
  me: PropTypes.shape({
    permissionLevel: PropTypes.string,
    state: PropTypes.number,
  }).isRequired,
  updateFilter: PropTypes.func.isRequired,
  stopFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired
};

MapView.defaultProps = {
  activeMedication: null,
  activeStateItem: null,
  activeZipCode: null,
  loading: 0,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapView);
