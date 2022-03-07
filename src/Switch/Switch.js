import React from 'react';
import PropTypes from 'prop-types';

function Switch(props) {
  let cls = ['toggle']
  if(props.isDarkTheme) {
    cls.push('dark')
  }
  return (
    <label className={cls.join(' ')} htmlFor="switch">
      <input type="checkbox" className="toggle__input" id="switch" onClick={props.choiceTheme} />
    </label>
  )
}

Switch.propTypes = {
  choiceTheme: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired
}


export default Switch;
