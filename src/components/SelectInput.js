import React from 'react';
import { useField } from 'formik';
import '../App.css'

const SelectInput = ({ label, name, options }) => {
  const [field, meta] = useField(name);

  return (
    <div className="form-group">
      <div className='select-style'>
      <label htmlFor={name}>{label}</label>
      </div>  
      <select {...field} className="form-control" id={name}>
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectInput;
    