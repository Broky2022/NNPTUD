import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'normal',
  className = '',
  disabled = false,
  fullWidth = false
}) => {
  const getVariantClass = () => {
    switch(variant) {
      case 'primary': return 'is-primary';
      case 'secondary': return 'is-info';
      case 'success': return 'is-success';
      case 'danger': return 'is-danger';
      case 'warning': return 'is-warning';
      case 'light': return 'is-light';
      default: return 'is-primary';
    }
  };
  
  const getSizeClass = () => {
    switch(size) {
      case 'small': return 'is-small';
      case 'normal': return '';
      case 'medium': return 'is-medium';
      case 'large': return 'is-large';
      default: return '';
    }
  };
  
  const classes = [
    'button',
    getVariantClass(),
    getSizeClass(),
    fullWidth ? 'is-fullwidth' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button 
      type={type} 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
