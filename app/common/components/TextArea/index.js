import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './styles.scss';

const FormInput = ({
  input,
  isOptional,
  label,
  meta,
  ...props
}) => (
  <div className="field">
    <div className="field__label">
      {label}
      {isOptional && <span className="field__label-optional">(optional)</span>}
    </div>
    <textarea
      id={input.name}
      {...props}
      {...input}
      className={classNames('field__textarea', { 'field__textarea--error': (meta.touched && meta.error) })}
    >
      {input.value}
    </textarea>
    {(meta.touched && meta.error) && (
      <div className="field__error">
        {meta.error}
      </div>
    )}
  </div>
);

FormInput.propTypes = {
  input: PropTypes.shape({}).isRequired,
  isOptional: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    touched: PropTypes.bool,
  }).isRequired,
};

FormInput.defaultProps = {
  label: null,
  isOptional: false,
};

export default FormInput;
