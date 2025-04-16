import React from 'react';

const Form = ({ 
  fields, 
  values, 
  onChange, 
  onSubmit, 
  submitText = 'Submit', 
  cancelText = 'Cancel',
  onCancel
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="field">
          <label className="label">{field.label}</label>
          <div className="control">
            {field.type === 'select' ? (
              <div className="select is-fullwidth">
                <select
                  name={field.name}
                  value={values[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : field.type === 'textarea' ? (
              <textarea
                className="textarea"
                name={field.name}
                value={values[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : field.type === 'checkbox' ? (
              <label className="checkbox">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={values[field.name] || false}
                  onChange={handleChange}
                />
                {' '}{field.checkboxLabel}
              </label>
            ) : (
              <input
                className="input"
                type={field.type || 'text'}
                name={field.name}
                value={values[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
          {field.help && <p className="help">{field.help}</p>}
        </div>
      ))}
      
      <div className="field is-grouped mt-4">
        <div className="control">
          <button type="submit" className="button is-primary">
            {submitText}
          </button>
        </div>
        {onCancel && (
          <div className="control">
            <button 
              type="button" 
              className="button is-light"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Form;
