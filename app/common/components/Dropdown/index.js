import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AnimateHeight from 'react-animate-height';
import classNames from 'classnames';

import './styles.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
    };

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.containerRef = React.createRef();
  }

  componentWillMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', this.onDocumentClick, false);
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.onDocumentClick, false);
    }
  }

  onDocumentClick(e) {
    if (!this.containerRef.current.contains(e.target)) {
      this.setState({
        showDropdown: false,
      });
    }
  }

  onItemClick(value) {
    this.setState({
      showDropdown: false,
    }, () => {
      this.props.onItemClick(value);
    });
  }

  onCategoryClick(value) {
    this.setState({
      showDropdown: false,
    }, () => {
      this.props.onCategoryClick(value);
    });
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown,
    });
  }

  renderItemsColumns(activeOptionCategory) {
    const { activeValue } = this.props;
    const itemsPerColumn = Math.ceil(activeOptionCategory.items.length / 4);

    return Array(4).fill(undefined).map((_, columnIndex) => (
      <div
        key={columnIndex}
        className="dropdown__items-list-column"
      >
        <ul className="dropdown__items-list">
          {activeOptionCategory.items.slice(itemsPerColumn * columnIndex, (itemsPerColumn * (columnIndex + 1))).map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="dropdown__item"
            >
              <button
                type="button"
                className={classNames('dropdown__item-button', { 'dropdown__item-button--active': item.name === activeValue })}
                onClick={() => this.onItemClick(item.name)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ));
  }

  renderSingleCategories() {
    const {
      activeValue,
      options,
    } = this.props;

    return (
      <ul className="dropdown__items-list">
        {options.map(option => (
          <li
            key={option.category.name}
            className="dropdown__item"
          >
            <button
              type="button"
              className={classNames('dropdown__item-button', { 'dropdown__item-button--active': option.category.name === activeValue })}
              onClick={() => this.onItemClick(option.category.name)}
            >
              {option.category.title}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { showDropdown } = this.state;
    const {
      activeCategory,
      activeValue,
      label,
      options,
      placeholder,
    } = this.props;
    const activeOptionCategory = options.find(option => option.category.name === activeCategory);
    let activeName = '';
    if (activeOptionCategory && activeOptionCategory.items && activeValue) {
      activeName = activeOptionCategory.items.find(item => item.name === activeValue).title;
    } else if (activeOptionCategory && activeOptionCategory.category) {
      activeName = activeOptionCategory.category.title;
    }

    return (
      <div
        className={classNames('dropdown', { 'dropdown--wide-content': activeOptionCategory && !!activeOptionCategory.items })}
        ref={this.containerRef}
      >
        <div className={classNames('dropdown__open-container', { 'dropdown__open-container--is-open': showDropdown })}>
          <p className="dropdown__label">
            {label}
          </p>
          <button
            type="button"
            className={classNames('dropdown__toggle', { 'dropdown__toggle--placeholder': !activeName && placeholder })}
            onClick={this.toggleDropdown}
          >
            {activeName || placeholder}
            <span
              className={classNames('dropdown__toggle-icon', {
                'icon-arrow-down': !showDropdown,
                'icon-arrow-up': showDropdown,
              })}
            />
          </button>
        </div>
        <div className={classNames('dropdown__list-container', { 'dropdown__list-container--is-open': showDropdown })}>
          <AnimateHeight
            duration={250}
            height={showDropdown ? 'auto' : 0}
          >
            {(activeOptionCategory && activeOptionCategory.items) ? (
              <div className="clearfix">
                <div className="dropdown__categories-container">
                  <ul className="dropdown__categories">
                    {options.map(option => (
                      <li
                        key={option.category.name}
                        className="dropdown__category-item"
                      >
                        <button
                          type="button"
                          className="dropdown__category"
                          onClick={() => this.onCategoryClick(option.category.name)}
                        >
                          {option.category.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown__columns-container cleafix">
                  {this.renderItemsColumns(activeOptionCategory)}
                </div>
              </div>
            ) : (
              <div className="clearfix">
                {this.renderSingleCategories()}
              </div>
            )}
          </AnimateHeight>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  activeCategory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string.isRequired,
  onCategoryClick: PropTypes.func,
  onItemClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.shape({
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      title: PropTypes.string,
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      title: PropTypes.string,
    })),
  })).isRequired,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  activeCategory: null,
  activeValue: null,
  onCategoryClick: () => {},
  placeholder: null,
};

export default Dropdown;
