import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import PropTypes from 'prop-types';

import Input from '@common/components/ReduxFields/Input';

import './styles.scss';

const ZipCodeFields = ({ handleSubmit }) => (
  <form
    className="zipcode-form"
    onSubmit={handleSubmit}
  >
    <Field
      wide
      name="zipcode"
      label="Or by Zip Code"
      placeholder="Enter Zip Code"
      component={Input}
    />
    <button
      type="submit"
      className="fas fa-search zipcode-form__button"
    />
  </form>
);

ZipCodeFields.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'zipCode',
})(ZipCodeFields);
