import React, { Component } from 'react';
import Mapbox from 'mapbox.js';
import PropTypes from 'prop-types';

import MapPopup from '@common/components/MapPopup';

import env from '@app/utils/env';

Mapbox.mapbox.accessToken = env.MAPBOX_KEY;

export default class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    this.setMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.center !== this.props.data.center) {
      this.map.remove();
      this.setMap();
    }
  }

  getSupplyColor(supply) {
    switch (supply) {
      case 'high': {
        return '#f0de99';
      }
      case 'medium': {
        return '#ef9e7b';
      }
      case 'low': {
        return '#af2837';
      }
      case 'nosupply': {
        return '#35383B';
      }
      default: {
        return '#e6e6e6';
      }
    }
  }

  getSecondarySupplyColor(supply) {
    switch (supply) {
      case 'high': {
        return '#f5d660';
      }
      case 'medium': {
        return '#ec875c';
      }
      case 'low': {
        return '#841f2b';
      }
      case 'nosupply': {
        return '#0B0B0B';
      }
      default: {
        return '#fafbfb';
      }
    }
  }

  setMap() {
    const {
      data,
      me,
    } = this.props;

    this.map = Mapbox.mapbox.map(
      this.mapContainer.current,
      'mapbox.light',
      {
        center: [...data.center.coordinates].reverse(),
        zoom: data.zoom,
        zoomControl: false,
      },
    );

    const featuresLayer = Mapbox.mapbox
      .featureLayer(
        null, {
          popupOptions: {
            className: 'map-popup-disable-pointer-events',
            closeButton: false,
          }
        }
      )
      .addTo(this.map);

    let geoJSONData = data;
    if (geoJSONData.features) {
      geoJSONData = {
        ...geoJSONData,
        features: geoJSONData.features.map((feature) => {
          const fillColor = this.getSupplyColor(feature.properties.supply);

          return {
            ...feature,
            properties: {
              ...feature.properties,
              state: geoJSONData.state,
              title: feature.properties.code ? `${feature.properties.name} (${feature.properties.code})` : feature.properties.name,
              fill: fillColor,
              'fill-opacity': 1,
              stroke: '#ffffff',
              'stroke-width': 1,
            },
          };
        }),
      };
    } else {
      const fillColor = this.getSupplyColor(geoJSONData.properties.supply);

      geoJSONData = {
        ...geoJSONData,
        properties: {
          ...geoJSONData.properties,
          fill: fillColor,
          'fill-opacity': geoJSONData.properties.zipcode ? 0.5 : 1,
          stroke: '#000000',
          'stroke-width': 1,
        },
      };
    }

    featuresLayer.setGeoJSON(geoJSONData);
    featuresLayer.on('mouseover', (e) => {
      const fillColor = this.getSecondarySupplyColor(e.layer.feature.properties.supply);
      e.layer.openPopup();
      e.layer.setStyle({
        fillColor,
      });
    });
    featuresLayer.on('click', (e) => {
      const { properties } = e.layer.feature;

      if (me.permissionLevel !== 'sl' || !properties.code || (me.permissionLevel === 'sl' && me.state === properties.id)) {
        this.props.onPopupOpen(e.layer.feature.properties);
      }
    });
    featuresLayer.on('mouseout', (e) => {
      const fillColor = this.getSupplyColor(e.layer.feature.properties.supply);
      e.layer.closePopup();
      e.layer.setStyle({
        fillColor,
      });
    });
  }

  render() {
    const {
      geoType,
      me,
      onPopupButtonClick,
      onPopupClose,
      popupProperties,
    } = this.props;

    return (
      <div className="map">
        <div
          ref={this.mapContainer}
          className="map__container"
        />
        {popupProperties && (
          <MapPopup
            map={this.map}
            properties={popupProperties}
            onPopupButtonClick={onPopupButtonClick}
            onPopupClose={onPopupClose}
            geoType={geoType}
            permissionLevel={me.permissionLevel}
          />
        )}
      </div>
    );
  }
}

MapComponent.propTypes = {
  data: PropTypes.shape({
    center: PropTypes.shape({}).isRequired,
  }).isRequired,
  me: PropTypes.shape({
    permissionLevel: PropTypes.string,
    state: PropTypes.number,
  }).isRequired,
  geoType: PropTypes.string.isRequired,
  onPopupButtonClick: PropTypes.func.isRequired,
  onPopupClose: PropTypes.func.isRequired,
  onPopupOpen: PropTypes.func.isRequired,
  popupProperties: PropTypes.shape({}),
};

MapComponent.defaultProps = {
  popupProperties: null,
};
