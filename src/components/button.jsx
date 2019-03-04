import React from 'react';
import propTypes from 'prop-types';
/* eslint-disable react/button-has-type */
export default function Button(props) {
  const { text, css, action, spinner = 'd-none', dismiss, type = 'button' } = props;
  return (
    <button type={type} className={`btn ${css}`} data-dismiss={dismiss} onClick={action}>
      <i className={`fa fa-spinner fa-pulse ${spinner}`} />
      {` ${text}`}
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
