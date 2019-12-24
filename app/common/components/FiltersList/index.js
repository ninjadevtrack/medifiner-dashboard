import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './styles.scss';

const FiltersList = ({
  filterName,
  filters,
  onChange,
}) => {
  return (
    <ul className="filters-list">
      {filters && filters.map(filter => (
        <li
          key={filterName+'-'+filter.id}
          className="filters-list__item"
        >
          <label
            htmlFor={filterName+'-'+filter.id}
            className="filters-list__filter"
          >
            <input
              type="checkbox"
              className="filters-list__checkbox"
              disabled={filter.disabled}
              id={filterName+'-'+filter.id}
              checked={filter.checked}
              onChange={() => onChange(filter, !filter.checked)}
            />
            <span
              className={classNames('filters-list__fake-checkbox', {
                'icon-tick': filter.checked,
              })}
            />
            <span className="filters-list__filter-name">
              {filter.name}
            </span>
            {!isNaN(filter.providersCount) && (
              <span className="filters-list__filter-count">
                ({filter.providersCount})
              </span>
            )}
          </label>
          <ul className="filters-list">
          {filter.organizations !== undefined && (
            filter.organizations.map(org => (
              <li
                key={filterName+'-'+filter.id+'-organizations-'+org.organizationId}
                className="filters-list__item"
              >
                <label
                  htmlFor={filterName+'-'+filter.id+'-organizations-'+org.organizationId}
                  className="filters-list__filter"
                >
                  <input
                    type="checkbox"
                    className="filters-list__checkbox"
                    disabled={org.disabled}
                    id={filterName+'-'+filter.id+'-organizations-'+org.organizationId}
                    checked={org.checked}
                    onChange={() => onChange(org, !org.checked, true)}
                  />
                  <span
                    className={classNames('filters-list__fake-checkbox', {
                      'icon-tick': org.checked,
                    })}
                  />
                  <span className="filters-list__filter-name">
                    {org.organizationName}
                  </span>
                  <span className="filters-list__filter-count">
                    ({org.providersCount})
                  </span>
                </label>
              </li>
            ))
          )}
          </ul>
        </li>
      ))}
    </ul>
  )
};

FiltersList.propTypes = {
  filterName: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    providersCount: PropTypes.number,
    name: PropTypes.string.isRequired,
    organizations: PropTypes.arrayOf(PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      disabled: PropTypes.bool.isRequired,
      providersCount: PropTypes.number,
      organizationName: PropTypes.string.isRequired,
      organizationId: PropTypes.number.isRequired,
    })),
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

FiltersList.defaultProps = {
  parentFilterName: null,
};

export default FiltersList;
