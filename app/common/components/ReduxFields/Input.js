import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Input from '@common/components/Input';

import './styles.scss';

const FormInput = ({
  input,
  label,
  meta,
  ...props
}) => (
  <div className="field">
    <Input
      wide
      id={input.name}
      autoComplete="off"
      label={label}
      {...props}
      {...input}
      inputClassName={classNames('field__input', { 'field__input--error': (meta.touched && meta.error) })}
    />
    {(meta.touched && meta.error) && (
      <div className="field__error">
        {meta.error}
      </div>
    )}
  </div>
);

FormInput.propTypes = {
  input: PropTypes.shape({}).isRequired,
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
};

export default FormInput;
