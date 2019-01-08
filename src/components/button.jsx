import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ text, css }) {
  return (
    <button type="button" className={`btn ${css}`}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  css: PropTypes.string,
};

Button.defaultProps = {
  css: 'btn-lg',
};
