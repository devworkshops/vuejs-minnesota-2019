import moment from 'moment'

export default function(value, format) {
  const defaultFormat = 'DD/MM/YYYY hh:mm'
  if (!format) {
    format = defaultFormat
  }
  if (value) {
    return moment(value).format(format)
  }
}
