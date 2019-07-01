import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import DateMoment from '../../utils/dateMoment';

function DatePicker(props) {
  return (<TextField
    defaultValue={ props.default }
    id='date'
    label={ props.label }
    onChange={ event => props.onChange(new DateMoment(event.target.value, 'YYYY-MM-DD')) }
    type='date'
    InputLabelProps={{
      shrink: true,
    }}
  />);
}

DatePicker.propTypes = {
  default: PropTypes
    .string
    .isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default DatePicker;