import React, { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

import debounce from 'lodash.debounce';

import PageFooter from '@common/components/PageFooter';
import PageHeader from '@common/components/PageHeader';

import FiltersContainer from '@common/containers/Filters';
import TopFiltersContainer from '@common/containers/TopFilters';

import './styles.scss';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentHeigth: 'auto',
    };

    this.updateFiltersHeight = debounce(this.updateFiltersHeight.bind(this), 250);

    this.contentColumnContainer = React.createRef();
    this.filtersColumnContainer = React.createRef();
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.updateFiltersHeight();

      window.addEventListener('resize', this.updateFiltersHeight);
    }

    Router.onRouteChangeComplete = () => {
      this.updateFiltersHeight();
    };
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateFiltersHeight);
    }
  }

  updateFiltersHeight() {
    if (this.contentColumnContainer.current && this.filtersColumnContainer.current) {
      const contentHeigth = this.contentColumnContainer.current.offsetHeight;
      this.setState({
        contentHeigth,
      });
    }
  }

  render() {
    const {
      children,
      componentName,
      withoutLayout,
    } = this.props;
    const { contentHeigth } = this.state;

    return (
      <div className="page-layout">
        <header className="page-layout__header">
          <PageHeader showMenu={!withoutLayout} />
        </header>
        <div className="page-container clearfix">
          {withoutLayout ? (
            <div>
              {children}
            </div>
          ) : [
            <div
              key="mainColumn"
              ref={this.contentColumnContainer}
              className="page-layout__main-column"
            >
              <TopFiltersContainer showDatepicker={componentName === 'HistoricPage'} />
              {children}
            </div>,
            <div
              key="rightColumn"
              ref={this.filtersColumnContainer}
              className="page-layout__right-column"
              style={{ height: contentHeigth }}
            >
              <FiltersContainer mapDateParam={componentName !== 'HistoricPage'} />
            </div>,
          ]}
        </div>
        <footer className="page-layout__footer">
          <PageFooter />
        </footer>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  componentName: PropTypes.string,
  withoutLayout: PropTypes.bool,
};

Layout.defaultProps = {
  withoutLayout: false,
};

export default Layout;
