import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const DatepickerMonthDays = ({
  currentMonth,
  currentYear,
  endDate,
  minDate,
  onDayClick,
  selectedDate,
}) => {
  const currentDate = moment(`${currentYear}-${currentMonth}-1`, 'YYYY-MM-DD');
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.weekday();
  const lastDayOfMonth = moment(`${currentYear}-${currentMonth}-${daysInMonth}`, 'YYYY-MM-DD').weekday();
  let calendarDays = Array(daysInMonth).fill(undefined).map((_, index) => ({
    day: Number(index + 1),
    month: currentMonth,
    year: currentYear,
  }));
  let daysBefore = [];
  if (firstDayOfMonth > 0) {
    const prevDate = currentDate.clone();
    prevDate.subtract(1, 'months');
    const lastYear = prevDate.format('YYYY');
    const lastMonth = prevDate.format('MM');
    const lastMonthRestDays = moment(`${lastYear}-${lastMonth}-01`).daysInMonth();

    daysBefore = Array(firstDayOfMonth).fill(undefined).map((_, index) => ({
      day: (lastMonthRestDays - firstDayOfMonth) + index + 1,
      month: parseInt(lastMonth, 10),
      year: parseInt(lastYear, 10),
    }));
  }
  let daysAfter = [];
  if (lastDayOfMonth < 6) {
    const nextDate = currentDate.clone();
    nextDate.add(1, 'months');
    const nextYear = nextDate.format('YYYY');
    const nextMonth = nextDate.format('MM');

    daysAfter = Array(6 - lastDayOfMonth).fill(undefined).map((_, index) => ({
      day: index + 1,
      month: parseInt(nextMonth, 10),
      year: parseInt(nextYear, 10),
    }));
  }
  calendarDays = [
    ...daysBefore,
    ...calendarDays,
    ...daysAfter,
  ];

  const endDateMoment = moment(endDate, 'MM/DD/YYYY');
  const endDateYear = parseInt(endDateMoment.format('YYYY'), 10);
  const endDateMonth = parseInt(endDateMoment.format('M'), 10);
  const endDateDay = parseInt(endDateMoment.format('D'), 10);
  const selectedDateMoment = moment(selectedDate, 'MM/DD/YYYY');
  const selectedDateYear = parseInt(selectedDateMoment.format('YYYY'), 10);
  const selectedDateMonth = parseInt(selectedDateMoment.format('M'), 10);
  const selectedDateDay = parseInt(selectedDateMoment.format('D'), 10);

  return (
    <div className="datepicker__month-days clearfix">
      {calendarDays.map((day) => {
        const dayMoment = moment(`${day.year}-${day.month}-${day.day}`, 'YYYY-MM-DD');
        const isActiveDay = day.year === selectedDateYear &&
          day.month === selectedDateMonth &&
          day.day === selectedDateDay;
        const datesRange = moment.range(selectedDate, endDate);
        const isInRange = datesRange.contains(dayMoment);
        const isLastDay = day.year === endDateYear &&
          day.month === endDateMonth &&
          day.day === endDateDay;

        return (
          <div
            key={`${day.month}${day.day}`}
            className={classNames('datepicker__month-day', {
              'datepicker__month-day--another-month': day.month !== currentMonth,
              'datepicker__month-day--active': isActiveDay,
              'datepicker__month-day--in-range': isInRange,
              'datepicker__month-day--last-day': isLastDay,
            })}
          >
            <button
              type="button"
              disabled={minDate.diff(dayMoment) <= 0}
              className="datepicker__month-day-helper"
              onClick={() => onDayClick(dayMoment.format('MM/DD/YYYY'))}
            >
              {day.day}
            </button>
          </div>
        );
      })}
    </div>
  );
};

DatepickerMonthDays.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  endDate: PropTypes.string.isRequired,
  minDate: PropTypes.shape({}).isRequired,
  onDayClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
};

export default DatepickerMonthDays;
