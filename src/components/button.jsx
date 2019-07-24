import React from 'react';
import propTypes from 'prop-types';
/* eslint-disable react/button-has-type */
export default function Button(props) {
  const { text, css, action, spinner = 'd-none', dismiss, type = 'button', disable } = props;
  return (
    <button
      type={type}
      disabled={disable}
      className={`btn ${css}`}
      data-dismiss={dismiss}
      onClick={action}
    >
      <i className={`fa fa-spinner fa-pulse ${spinner}`} />
      {` ${text}`}
    </button>
  );
}

export function ModalButton({ click, toggle = 'modal', target, css, icon, text = '' }) {
  return (
    <button
      onClick={click}
      type="button"
      data-toggle={toggle}
      data-target={target}
      className={`btn ${css}`}
      aria-expanded="false"
    >
      <i className={icon} />
      <p className="vote-number">{text}</p>
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
