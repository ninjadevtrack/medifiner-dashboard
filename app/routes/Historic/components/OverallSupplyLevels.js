import React from 'react';
import PropTypes from 'prop-types';

import Loader from '@common/components/Loader';
import SupplyGraph from '@routes/Historic/components/SupplyGraph';

import '@routes/Historic/styles/OverallSupplyLevels.scss';

const OverallSupplyLevels = ({ data, loading }) => (
  <div className="overall-supply">
    {loading && ( <Loader className="loader__float_right" /> )}
    <h2>
      Breakdown of Overall Supply Levels* in Last Two Weeks
    </h2>
    <p className="overall-supply__text">
      *Percentage breakdown of medication supply levels recorded from all collected pharmacy reports within the selected geography.
    </p>
    <div className="overall-supply__graph">
      {!!data.length && (
        <SupplyGraph data={data[0].overallSupplyPerDay} />
      )}
    </div>
  </div>
);

OverallSupplyLevels.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    overallSupplyPerDay: PropTypes.arrayOf(PropTypes.shape({
      day: PropTypes.string.isRequired,
      supply: PropTypes.shape({
        low: PropTypes.number.isRequired,
        medium: PropTypes.number.isRequired,
        high: PropTypes.number.isRequired
      }).isRequired,
    }))
  })).isRequired,
  loading: PropTypes.bool.isRequired
};

export default OverallSupplyLevels;
