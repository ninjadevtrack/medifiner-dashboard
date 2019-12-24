import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import ReactSelect, { components } from 'react-select';

import './styles.scss';

const IndicatorSeparator = () => null;

const DropdownIndicator = props => components.DropdownIndicator && (
  <components.DropdownIndicator {...props}>
    <i
      className={classNames('fas', {
        'fa-angle-down': !props.selectProps.menuIsOpen,
        'fa-angle-up': props.selectProps.menuIsOpen,
      })}
    />
  </components.DropdownIndicator>
);

const FormSelect = ({
  input,
  label,
  meta,
  options,
  ...props
}) => (
  <div className="field">
    <label className="field__label">{label}</label>
    <ReactSelect
      backspaceRemovesValue={false}
      id={input.name}
      label={label}
      className="select"
      classNamePrefix="select"
      {...props}
      {...input}
      options={options}
      components={{
        DropdownIndicator,
        IndicatorSeparator,
      }}
      onBlur={null}
    />
    {(meta.touched && meta.error) && (
      <div className="field__error">
        {meta.error}
      </div>
    )}
  </div>
);

FormSelect.propTypes = {
  input: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    touched: PropTypes.bool,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  })).isRequired,
};

export default FormSelect;
