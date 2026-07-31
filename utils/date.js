import moment from 'moment'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Breaks a date into the labeled parts the calendar components render.
export const formatDateParts = (date, { longMonth = false } = {}) => ({
  dayString: DAY_NAMES[moment(date).day()],
  numString: moment(date).date(),
  monthString: (longMonth ? MONTHS_LONG : MONTHS_SHORT)[moment(date).month()],
  yearString: new Date(date).getFullYear(),
  timeString: moment(date).format('LT'),
})
