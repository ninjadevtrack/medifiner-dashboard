import React from 'react';
import { withRouter } from 'next/router';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Navigation = ({
  items,
  router,
}) => (
  <div className="navigation">
    <ul className="navigation__items-list">
      {items.map((item) => {
        let linkProps = {};
        if (item.external) {
          linkProps = {
            target: '_blank',
            rel: 'noopener noreferrer',
          };
        }

        return (
          <li
            key={item.href}
            className="navigation__item"
          >
            <NextLink href={item.href}>
              <a
                className={classNames('navigation__link', {
                  'navigation__link--active': router.pathname === item.href,
                  'navigation__link--external': item.external,
                })}
                {...linkProps}
              >
                {item.text}
                {item.external && <i className="fas fa-arrow-right navigation__external-link-icon" />}
              </a>
            </NextLink>
          </li>
        );
      })}
    </ul>
  </div>
);

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Navigation);
