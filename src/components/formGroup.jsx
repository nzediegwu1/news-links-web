import React from 'react';
import PropTypes from 'prop-types';

export default function FormGroup({ id, type, placeholder, value, icon, onChange, name }) {
  return (
    <div id={id} className="form-group">
      <div className="input-group input-group-lg">
        <i className={`fa ${icon}`} />
        <input
          id={`input-${id}`}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          className="form-control"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

FormGroup.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

FormGroup.defaultProps = {
  type: 'text',
};
