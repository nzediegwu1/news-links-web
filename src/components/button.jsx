import React from 'react';
import propTypes from 'prop-types';
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
  text: propTypes.string.isRequired,
  css: propTypes.string,
  action: propTypes.func,
  dismiss: propTypes.string,
};

Button.defaultProps = {
  css: 'btn-lg',
  action: null,
  dismiss: null,
};
