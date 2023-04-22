import { getDayBetweenDates } from '../src/utils/functions';
import moment from 'moment';

describe('getDayBetweenDates', () => {
  test('returns "today" if the date is today', () => {
    const today = moment().format('YYYY-MM-DD');
    expect(getDayBetweenDates(today)).toEqual('today');
  });

  test('returns "1 day ago" if the date is yesterday', () => {
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    expect(getDayBetweenDates(yesterday)).toEqual('1 day ago');
  });

  test('returns "X days ago" if the date is X days ago but less than 6', () => {
    const fiveDaysAgo = moment().subtract(5, 'days').format('YYYY-MM-DD');
    expect(getDayBetweenDates(fiveDaysAgo)).toEqual('5 days ago');
  });

  test('returns the original date if the date is more than 5 days ago', () => {
    const sixDaysAgo = moment().subtract(6, 'days').format('YYYY-MM-DD');
    expect(getDayBetweenDates(sixDaysAgo)).toEqual(sixDaysAgo);
  });
});
