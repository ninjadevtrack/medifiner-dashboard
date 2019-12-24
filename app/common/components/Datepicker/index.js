import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import DatepickerDropdown from '@common/components/DatepickerDropdown';
import Input from '@common/components/Input';

import './styles.scss';

export default class Datepicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonth: parseInt(moment().format('M'), 10),
      currentYear: parseInt(moment().format('YYYY'), 10),
      endDate: moment(props.defaultDate).add(props.daysRange, 'days').format('MM/DD/YYYY'),
      selectedDate: props.defaultDate,
      showDatepicker: false,
    };

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', this.onDocumentClick, false);
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.onDocumentClick, false);
    }
  }

  onDocumentClick(e) {
    if (!this.containerRef.current.contains(e.target)) {
      this.setState({
        showDatepicker: false,
      });
    }
  }

  onInputFocus() {
    this.setState({
      showDatepicker: true,
    });
  }

  onMonthChange(direction) {
    const { currentMonth, currentYear } = this.state;
    let newMonth, newYear;
    const nowYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth()+1;
    if (direction > 0) {
      if(currentMonth === nowMonth && currentYear === nowYear) return; 
      if (currentMonth === 12) {
        newMonth = 1;
        newYear = currentYear + 1;
      } else {
        newMonth = currentMonth + 1;
        newYear = currentYear;
      }
    } else {
      // eslint-disable-next-line
      if (currentMonth === 1) {
        newMonth = 12;
        newYear = currentYear - 1;
      } else {
        newMonth = currentMonth - 1;
        newYear = currentYear;
      }
    }

    this.setState({
      currentYear: newYear > nowYear ? nowYear : newYear,
      currentMonth: newMonth,
    });
  }

  onYearChange(step) {
    const { currentYear } = this.state;
    const newYear = currentYear + step;
    const nowYear = new Date().getFullYear();
    this.setState({
      currentYear: newYear > nowYear ? nowYear : newYear
    });
  }

  onDayClick(selectedDate) {
    this.setState({
      endDate: moment(selectedDate).add(this.props.daysRange, 'days').format('MM/DD/YYYY'),
      selectedDate,
    }, () => {
      this.props.onChange(this.state.selectedDate);
    });

    if(this.props.closeOnSelect){
      this.setState({
        showDatepicker: false,
      });
    }
  }

  render() {
    const {
      currentMonth,
      currentYear,
      endDate,
      selectedDate,
      showDatepicker,
    } = this.state;
    const { label } = this.props;

    return (
      <div
        className="datepicker"
        ref={this.containerRef}
      >
        <Input
          readOnly
          wide
          label={label}
          className="datepicker__input-container"
          inputClassName="datepicker__input"
          value={selectedDate}
          onFocus={this.onInputFocus}
        >
          <i className="far fa-calendar-alt datepicker__input-icon" aria-hidden="true" />
        </Input>
        {showDatepicker && (
          <DatepickerDropdown
            currentMonth={currentMonth}
            currentYear={currentYear}
            endDate={endDate}
            minDate={moment().subtract(this.props.daysRange, 'days')}
            selectedDate={selectedDate}
            onDayClick={this.onDayClick}
            onMonthChange={this.onMonthChange}
            onYearChange={this.onYearChange}
          />
        )}
      </div>
    );
  }
}

Datepicker.propTypes = {
  closeOnSelect: PropTypes.bool.isRequired,
  daysRange: PropTypes.number.isRequired,
  defaultDate: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Datepicker.defaultProps = {
  closeOnSelect: false,
  label: null,
};
