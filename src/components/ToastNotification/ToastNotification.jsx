import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ToastNotification = ({ title, body, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000); // Toast sẽ tự động đóng sau 3 giây
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <div className={`toast-container position-fixed bottom-0 end-0 p-3 ${show ? 'show' : ''}`}>
      <div className={`toast ${show ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">{title}</strong>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
        </div>
        <div className="toast-body">
          {body}
        </div>
      </div>
    </div>
  );
};

ToastNotification.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToastNotification;
