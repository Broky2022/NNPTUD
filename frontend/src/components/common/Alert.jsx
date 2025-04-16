import React from 'react';

const Alert = ({ 
  type = 'info', 
  message, 
  onClose, 
  title
}) => {
  if (!message) return null;

  const getAlertClass = () => {
    switch(type) {
      case 'info': return 'is-info';
      case 'success': return 'is-success';
      case 'warning': return 'is-warning';
      case 'error': return 'is-danger';
      default: return 'is-info';
    }
  };

  return (
    <div className={`notification ${getAlertClass()}`}>
      {onClose && (
        <button className="delete" onClick={onClose}></button>
      )}
      {title && <p className="title is-5">{title}</p>}
      <p>{message}</p>
    </div>
  );
};

export default Alert;
