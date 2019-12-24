import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AnimateHeight from 'react-animate-height';
import classNames from 'classnames';

import FiltersList from '@common/components/FiltersList';

import './styles.scss';

class FilterCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCategory: true,
    };

    this.onFiltersListChange = this.onFiltersListChange.bind(this);
    this.toggleCategory = this.toggleCategory.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }

  toggleCategory() {
    this.setState({
      showCategory: !this.state.showCategory,
    });
  }

  selectAll(){
    const {
      filterCategoryName,
      filters,
      onFilterChange,
    } = this.props;

    filters.map(filter => {
      if(!filter.disabled){
        filter.checked = true
      }
    })

    onFilterChange(filterCategoryName, filters)
  }

  onFiltersListChange(modifiedFilter, checked, isOrganization=false) {
    const {
      filterCategoryName,
      filters,
      onFilterChange,
    } = this.props;

    filters.map(filter => {
      if(!isOrganization){
        if(filter == modifiedFilter){
          filter.checked = checked

          if(filter.organizations){
            filter.organizations.map(organization => {
              organization.checked = checked
              organization.disabled = !checked
            })
          }
        }
      }else{
        filter.organizations.map(organization => {
          if(organization == modifiedFilter){
            organization.checked = checked
          }
        })
        filter.checked = filter.organizations.reduce((filterChecked, organization) => filterChecked || organization.checked, false);
      }
    })

    onFilterChange(filterCategoryName, filters)
  }


  render() {
    const {
      filterCategoryName,
      filters,
      onCategorySelect,
      onFilterChange,
    } = this.props;
    const { showCategory } = this.state;

    let showSelectAll = filters.some(filter => !filter.checked);
    if (filters[0] && filters[0].providersCount !== undefined) {
      showSelectAll = filters.filter(filter => filter.providersCount).some(filter => !filter.checked);
    }

    const categoryName = filterCategoryName.split(/(?=[A-Z])/).join(" ")

    return (
      <div className="filter-category">
        <div className="filter-category__title-container">
          <p className="filter-category__title-text">
            {categoryName}
          </p>
          <p className="filter-category__toggle-container">
            <button
              type="button"
              className={classNames('filter-category__toggle', {
                'icon-arrow-up': showCategory,
                'icon-arrow-down': !showCategory,
              })}
              onClick={this.toggleCategory}
            />
          </p>
        </div>
        {showSelectAll && (
          <p className="filter-category__action-container">
            <button
              type="button"
              className="filter-category__action"
              onClick={this.selectAll}
            >
              Select all
            </button>
          </p>
        )}
        <AnimateHeight height={showCategory ? 'auto' : 0}>
          <FiltersList
            filterName={filterCategoryName}
            filters={filters}
            onChange={this.onFiltersListChange}
          />
        </AnimateHeight>
      </div>
    );
  }
}

FilterCategory.propTypes = {
  filterCategoryName: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    count: PropTypes.number,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    organizations: PropTypes.arrayOf(PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      disabled: PropTypes.bool.isRequired,
      providersCount: PropTypes.number,
      organizationName: PropTypes.string.isRequired,
      organizationId: PropTypes.number.isRequired,
    })),
  })).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterCategory;
