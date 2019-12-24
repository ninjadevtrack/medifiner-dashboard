import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '@common/components/Navigation';

import ExportContainer from '@common/containers/Export';
import UserAvatar from '@common/containers/UserAvatar';

import './styles.scss';

const PageHeader = ({ showMenu }) => (
  <div className="page-header">
    <div className="page-container clearfix">
      <div className="page-header__logo-container">
        <a href="/">
          <h1 className="page-header__logo">
            Med<span className="page-header__logo-highlight">Finder</span>
          </h1>
        </a>
      </div>
      {showMenu && [
        <div
          key="navigation"
          className="page-header__navigation-container"
        >
          <Navigation
            items={[{
              href: '/',
              text: 'Map View',
            }, {
              href: '/historic',
              text: 'Historic View',
            }, {
              external: true,
              href: 'https://www.medfinder.us',
              text: 'Find an Antiviral',
            }, {
              external: true,
              href: 'https://gis.cdc.gov/grasp/fluview/main.html',
              text: 'CDC FluView',
            }]}
          />
        </div>,
        <div
          key="exportUser"
          className="page-header__user-column"
        >
          <div className="page-header__button-container">
            <ExportContainer />
          </div>
          <div className="page-header__user-container">
            <UserAvatar />
          </div>
        </div>,
      ]}
    </div>
  </div>
);

PageHeader.propTypes = {
  showMenu: PropTypes.bool.isRequired,
};

export default PageHeader;
