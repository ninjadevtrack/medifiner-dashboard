import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Loader from '@common/components/Loader';

import '@routes/Historic/styles/AverageSupplyLevel.scss';

const AverageSuppyLevel = ({ data, loading }) => {
  data.sort((a, b) => {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })

  return (
    <div className="average-supply">
      {loading && ( <Loader className="loader__float_right" /> )}
      <h2>
        Average Supply Level* By Drug Formulation in Last Two Weeks
      </h2>
      <p className="average-supply__text">
        *Indicates the medication supply level recorded from at least 85% of pharmacy reports within the selected geography. Supply level estimates are calculated at the pharmacy and reported to MedFinder.
      </p>
      {!!data.length && (
        <table className="average-supply__table">
          <thead>
            <tr>
              <th className="average-supply__table-head-cell">
                &nbsp;
              </th>
              {data[0].averageSupplyPerDay.map(date => (
                <th
                  key={date.day}
                  className="average-supply__table-head-cell"
                >
                  <span className="average-supply__table-head-cell--week">{moment(date.day, 'YYYY-MM-DD').weekday() === 0 ? 'Week '+moment(date.day, 'YYYY-MM-DD').week() : ''}</span><br/>
                  {moment(date.day, 'YYYY-MM-DD').format('MM/DD')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(el => (
              <tr key={el.name}>
                <td className="average-supply__row-name">
                  {el.name}
                </td>
                {el.averageSupplyPerDay.map(item => (
                  <td
                    key={item.day}
                    className={`average-supply__color average-supply__color--${item.supply[1]}`}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
};
AverageSuppyLevel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    averageSupplyPerDay: PropTypes.arrayOf(PropTypes.shape({
      day: PropTypes.string.isRequired,
      supply: PropTypes.array.isRequired,
    })),
    name: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired
};

export default AverageSuppyLevel;
