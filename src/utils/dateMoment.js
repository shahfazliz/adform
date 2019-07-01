import moment from 'moment';

/**
 * Using Adapter design pattern, we wrap moment.js a third party library so that the usage is
 * consistent throughout our application. This also gives us the flexibility to change to a
 * different library without changing the code base.
 */
class DateMoment {
  constructor(dateString, format) {
    this.initializedDate = moment(dateString, format);
    return this;
  }

  isValid = () => this.initializedDate.isValid();

  toString = format => this
    .initializedDate
    .format(format || 'L');

  isSameOrBefore = dateMomentObject => this
    .initializedDate
    .isSameOrBefore(dateMomentObject);

  isSameOrAfter = dateMomentObject => this
    .initializedDate
    .isSameOrAfter(dateMomentObject);
}

export default DateMoment;