import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import FormText from '../FormText/FormText';
import styles from './DatePicker.module.scss';
import moment from 'moment';
import FormError from '../../FormError/FormError';

type DatePickerProps = {
  children?: ReactNode;
  datePickerRef: React.RefObject<HTMLInputElement>;
  error?: string[];
};

type DatePickerState = {
  value: string;
};

const dateFormat = 'DD/MM/YYYY';

class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  state = {
    value: '',
  };

  handleDate = (event: React.ChangeEvent<HTMLDataElement>) => {
    const { value } = event.target;
    this.setState({ value: moment(value).format(dateFormat) });
  };

  render() {
    const { children, datePickerRef, error } = this.props;

    return (
      <label>
        <span className={styles.datePicker__title}>{children}</span>
        <div className={styles.datePicker__wrapper}>
          <FormText disabled value={this.state.value} />
          <div className={styles.datePicker__dateForm}>
            <FontAwesomeIcon
              className={styles.datePicker__icon}
              icon={faCalendarDays}
              style={{ fontSize: '24px' }}
            />
            <input
              type="date"
              className={styles.datePicker__input}
              onChange={this.handleDate}
              ref={datePickerRef}
            />
          </div>
        </div>
        {error !== undefined && <FormError error={error} />}
      </label>
    );
  }
}

export default DatePicker;
