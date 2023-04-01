import moment from 'moment';

const getDayBetweenDates = (date: string) => {
  const postDate = moment(date);
  const currentDate = moment();

  const dayBetween = currentDate.diff(postDate, 'days');

  if (dayBetween === 0) {
    return `today`;
  } else if (dayBetween === 1) {
    return `1 day ago`;
  } else if (dayBetween < 6) {
    return `${dayBetween} days ago`;
  } else {
    return date;
  }
};

export { getDayBetweenDates };
