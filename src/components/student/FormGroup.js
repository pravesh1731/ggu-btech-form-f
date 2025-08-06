import React from "react";
import "../../App.css";

const FormGroup = ({ children, className = "form-group" }) => {
  return <div className={className}>{children}</div>;
};

export default FormGroup;
