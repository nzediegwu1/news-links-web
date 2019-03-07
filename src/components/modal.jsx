import React from 'react';
import Button from './button';

const Modal = (props) => {
  const { title, id, render } = props;
  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{render}</div>
          <div className="modal-footer">
            <Button text="Close" css="btn-secondary" dismiss="modal" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
