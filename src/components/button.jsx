import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/button-has-type */
export default function Button(props) {
  const { text, css, action, dismiss, type = 'button' } = props;
  return (
    <button type={type} data-dismiss={dismiss} onClick={action} className={`btn ${css}`}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  css: PropTypes.string,
  action: PropTypes.func,
  dismiss: PropTypes.string,
};

Button.defaultProps = {
  css: 'btn-lg',
  action: null,
  dismiss: null,
};
