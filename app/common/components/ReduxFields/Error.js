import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const ErrorComponent = ({ meta }) => (
  <div className="error-component">
    {meta.error && (
      <div className="error-component__text">
        {meta.error}
      </div>
    )}
  </div>
);

ErrorComponent.propTypes = {
  meta: PropTypes.shape({
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    touched: PropTypes.bool,
  }).isRequired,
};

export default ErrorComponent;
