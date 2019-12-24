import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Input = ({
  children,
  className,
  inputClassName,
  label,
  wide,
  ...props,
}) => (
  <div
    className={
      classNames(className, {
        input: true,
        'input--wide': wide,
      })
    }
  >
    <label className="input__label">{label}</label>
    <input
      type="text"
      className={classNames('input__input', inputClassName)}
      {...props}
    />
    {children}
  </div>
);

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.string,
  wide: PropTypes.bool,
};

Input.defaultProps = {
  children: null,
  className: '',
  inputClassName: '',
  label: null,
  wide: false,
};

export default Input;
