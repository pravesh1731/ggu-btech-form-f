import React from "react";
import FormGroup from "./FormGroup";
import "../../App.css";

const FormField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  required = false, 
  options = [], 
  accept,
  rows 
}) => {
  const renderInput = () => {
    if (type === "select") {
      return (
        <select name={name} required={required} value={value} onChange={onChange}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          rows={rows || 3}
        />
      );
    }

    return (
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        accept={accept}
      />
    );
  };

  return (
    <FormGroup>
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {renderInput()}
    </FormGroup>
  );
};

export default FormField;
