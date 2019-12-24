import React from 'react';
import PropTypes from 'prop-types';

import Button from '@common/components/Button';

function parsePopulation(populations) {
  if (populations > 1000000) {
    return `${Math.round(populations / 10000) / 100} million`;
  }
  if (populations > 1000) {
    return `${Math.round(populations / 10)}`;
  }

  return populations;
}

function percentageProviderCount(activeProviderCount, totalProviderCount) {
  const result = parseInt((activeProviderCount / totalProviderCount) * 100)
  if (isNaN(result)){
    return '0'
  }
  return result
}

const MapPopup = ({
  geoType,
  onPopupButtonClick,
  onPopupClose,
  permissionLevel,
  properties,
}) => {
  let buttonText;
  if (geoType === 'country') {
    if (permissionLevel === 'sl') {
      buttonText = 'Return to State View';
    } else {
      buttonText = 'View state details';
    }
  } else if (geoType === 'state' && properties.id) {
    if (permissionLevel === 'sl') {
      buttonText = 'Compare to National';
    } else {
      buttonText = 'Return to national';
    }
  } else if (geoType === 'state') {
    buttonText = 'Return to state';
  } else if (geoType === 'zipcode') {
    buttonText = 'Return to national';
  }
  
  let propertyId = properties.id;
  if (properties.state) {
    propertyId = properties.state.id;
  }

  const popupMaxWidth = 260;
  let highestSupplyLevel = properties.supplies ?
    Object.values(properties.supplies).sort((a, b) => b - a)[0] : 1;

  // No division by 0
  if (highestSupplyLevel === 0) {
    highestSupplyLevel = 1;
  }

  let sortedSupplies = Object.entries(properties.supplies)

  sortedSupplies.sort((a, b) => {
    const order = ['nosupply', 'low', 'medium', 'high']
    const key1 = a[0]
    const key2 = b[0]
    return order.indexOf(key2) - order.indexOf(key1)
  })

  return (
    <div className="map-popup">
      <button
        type="button"
        className="map-popup__close"
        onClick={onPopupClose}
      >
        <i className="fas fa-times-circle" />
      </button>
      <p className="map-popup__name">
        {properties.name || properties.zipcode} {properties.code ? `(${properties.code})` : ''}
      </p>
      <p className="map-popup__text">
        Population <strong>{parsePopulation(properties.population)}</strong>
      </p>
      <p className="map-popup__text">
        Participating Pharmacies <strong>{properties.activeProviderCount}/</strong>{properties.totalProviderCount} (~{percentageProviderCount(properties.activeProviderCount, properties.totalProviderCount)}%) out of Total Pharmacies
      </p>
      <p className="map-popup__text">
        <strong>Pharmacy Report Counts by Supply Level</strong> (filters applied)
      </p>
      <div className="map-popup__supplies">
        {properties && properties.supplies && sortedSupplies.map(([levelName, levelValue]) => (
          <p
            key={levelName}
            className="map-popup__supply"
          >
            <span
              className={`map-popup__supply-level map-popup__supply-level--${levelName}`}
              style={{ width: (levelValue * popupMaxWidth / highestSupplyLevel) }}
            />
            <span className="map-popup__supply-text">{levelValue} - {levelName == 'nosupply' ? 'No Supply' : levelName}</span>
          </p>
        ))}
      </div>
      {(
        <Button
          secondary
          wide
          onClick={() => onPopupButtonClick((properties.state && geoType !== 'zipcode') ? 'county' : geoType, propertyId)}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

MapPopup.propTypes = {
  geoType: PropTypes.string.isRequired,
  onPopupButtonClick: PropTypes.func.isRequired,
  onPopupClose: PropTypes.func.isRequired,
  permissionLevel: PropTypes.string.isRequired,
  properties: PropTypes.shape({
    activeProviderCount: PropTypes.number,
    totalProviderCount: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    supply: PropTypes.string,
    population: PropTypes.number,
    zipcode: PropTypes.string,
  }).isRequired,
};

export default MapPopup;
