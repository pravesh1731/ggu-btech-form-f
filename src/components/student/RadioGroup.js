import React from "react";
import FormGroup from "./FormGroup";
import "../../App.css";

const RadioGroup = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <FormGroup>
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div>
        {options.map((option) => (
          <label key={option.value} style={{ marginRight: "20px" }}>
            <input
              type="radio"
              name={name}
              value={option.value}
              required={required}
              checked={value === option.value}
              onChange={onChange}
            />
            {option.label}
          </label>
        ))}
      </div>
    </FormGroup>
  );
};

export default RadioGroup;
