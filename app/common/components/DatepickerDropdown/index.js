import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import DatepickerMonthDays from '@common/components/DatepickerMonthDays';

const DatepickerDropdown = ({
  currentMonth,
  currentYear,
  endDate,
  minDate,
  onDayClick,
  onMonthChange,
  onYearChange,
  selectedDate,
}) => (
  <div className="datepicker__dropdown">
    <div className="clearfix">
      <div className="datepicker__picker">
        <button
          type="button"
          className="datepicker__arrow-change datepicker__arrow-change--prev fas fa-angle-left"
          onClick={() => onMonthChange(-1)}
        />
        {moment.months(currentMonth - 1)}
        <button
          type="button"
          className="datepicker__arrow-change datepicker__arrow-change--next fas fa-angle-right"
          onClick={() => onMonthChange(1)}
        />
      </div>
      <div className="datepicker__picker">
        <button
          type="button"
          className="datepicker__arrow-change datepicker__arrow-change--prev fas fa-angle-left"
          onClick={() => onYearChange(-1)}
        />
        {currentYear}
        <button
          type="button"
          className="datepicker__arrow-change datepicker__arrow-change--next fas fa-angle-right"
          onClick={() => onYearChange(1)}
        />
      </div>
    </div>
    <div className="datepicker__weekdays clearfix">
      {moment.weekdaysShort().map(day => (
        <div
          key={day}
          className="datepicker__weekday"
        >
          {day}
        </div>
      ))}
    </div>
    <DatepickerMonthDays
      currentMonth={currentMonth}
      currentYear={currentYear}
      endDate={endDate}
      minDate={minDate}
      selectedDate={selectedDate}
      onDayClick={onDayClick}
    />
  </div>
);

DatepickerDropdown.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  endDate: PropTypes.string.isRequired,
  minDate: PropTypes.shape({}).isRequired,
  onDayClick: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
};

export default DatepickerDropdown;
