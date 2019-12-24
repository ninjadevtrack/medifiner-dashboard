import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Loader = ({ className, ...props }) => (
    <div
      className={classNames(className, {
        loader: true,
      })}
    >
    </div>
  );

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: '',
};

export default Loader;
