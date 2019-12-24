import React from 'react';

import './styles.scss';

export default () => (
  <div className="map-legend">
    <div className="map-legend__row">
      <div className="map-legend__column">
        <div className="map-legend__level-container">
          <span className="map-legend__level-color map-legend__level-color--high" />
          <p className="map-legend__level-text">
            +2 Day Supply <span className="map-legend__level-text-helper">(High)</span>
          </p>
        </div>
      </div>
      <div className="map-legend__column">
        <div className="map-legend__level-container">
          <span className="map-legend__level-color map-legend__level-color--medium" />
          <p className="map-legend__level-text">
            1-2 Day Supply <span className="map-legend__level-text-helper">(Medium)</span>
          </p>
        </div>
      </div>
      <div className="map-legend__column">
        <div className="map-legend__level-container">
          <span className="map-legend__level-color map-legend__level-color--low" />
          <p className="map-legend__level-text">
            &lt; 1 Day Supply <span className="map-legend__level-text-helper">(Low)</span>
          </p>
        </div>
      </div>
      <div className="map-legend__column">
        <div className="map-legend__level-container">
          <span className="map-legend__level-color map-legend__level-color--nosupply" />
          <p className="map-legend__level-text">
            No Supply
          </p>
        </div>
      </div>
      <div className="map-legend__column">
        <div className="map-legend__level-container">
          <span className="map-legend__level-color" />
          <p className="map-legend__level-text">
            <span className="map-legend__level-text-helper">No Reports</span>
          </p>
        </div>
      </div>
      <div className="map-legend__column map-legend__column--wide">
        <div className="map-legend__level-container map-legend__level-container--no-color">
          <p className="map-legend__level-text">
            <span className="map-legend__level-text-helper">
              These color-coded supply levels indicate areas where at least 85% of pharmacy reports correspond to +2 day supply (high), 1-2 day supply (medium), or &lt;1 day supply (low). Reports are provided by participating MedFinder pharmacies (approx. 30% of pharmacies in US).
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
);
