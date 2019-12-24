import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import '@routes/Historic/styles/SupplyGraph.scss';

export default class SupplyGraph extends Component {
  constructor(props) {
    super(props);

    this.percents = [
      100,
      75,
      50,
      25,
      0,
    ];
  }

  render() {
    const { data } = this.props;

    return (
      <div className="supply-graph">
        <div className="supply-graph__percents">
          {this.percents.map(percent => (
            <div
              key={percent}
              className="supply-graph__percent"
            >
              <div className="supply-graph__percent-text">
                {percent}
              </div>
            </div>
          ))}
        </div>
        <div className="supply-graph__content">
          {data.map(el => (
            <div
              key={el.day}
              className="supply-graph__element"
            >
              <div
                className="supply-graph__element-level supply-graph__element-level--high"
                style={{ height: `${el.supply.high}%` }}
              />
              <div
                className="supply-graph__element-level supply-graph__element-level--medium"
                style={{ height: `${el.supply.medium}%` }}
              />
              <div
                className="supply-graph__element-level supply-graph__element-level--low"
                style={{ height: `${el.supply.low}%` }}
              />
              <div
                className="supply-graph__element-level supply-graph__element-level--nosupply"
                style={{ height: `${el.supply.nosupply}%` }}
              />
              <div className="supply-graph__element-date">
                {moment(el.day, 'YYYY-MM-DD').format('MM/DD')}
              </div>
              <div className="supply-graph__popup">
                <div className="supply-graph__popup-title">
                  {moment(el.day, 'YYYY-MM-DD').format('MM/DD/YY')}
                </div>
                <div className="supply-graph__supply-levels">
                  <div className="supply-graph__supply-level">
                    <div className="supply-graph__supply-level-color supply-graph__supply-level-color--high" />
                    {Number((el.supply.high).toFixed(2))}% – High
                  </div>
                  <div className="supply-graph__supply-level">
                    <div className="supply-graph__supply-level-color supply-graph__supply-level-color--medium" />
                    {Number((el.supply.medium).toFixed(2))}% – Medium
                  </div>
                  <div className="supply-graph__supply-level">
                    <div className="supply-graph__supply-level-color supply-graph__supply-level-color--low" />
                    {Number((el.supply.low).toFixed(2))}% – Low
                  </div>
                  <div className="supply-graph__supply-level">
                    <div className="supply-graph__supply-level-color supply-graph__supply-level-color--nosupply" />
                    {Number((el.supply.nosupply).toFixed(2))}% – No Supply
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

SupplyGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string.isRequired,
    supply: PropTypes.shape({
      high: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
      medium: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
};
