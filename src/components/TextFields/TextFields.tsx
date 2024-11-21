import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import "./textField.css";

type TextFieldProps = {
  required?: boolean; // Whether the field is required
  formikRequired?: boolean; // If the field should have Formik's "required" styling
  type?: string; // Input type (e.g., text, password, etc.)
  className?: string; // Additional CSS classes
  name: string; // Name for Formik field and ErrorMessage
  placeholder?: string; // Placeholder text
  label?: string; // Label text
  isNotFormik?: boolean; // If true, Formik is not used for error handling
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  readOnly?: boolean; // Whether the field is read-only
  disabled?: boolean; // Whether the field is disabled
  autoFocus?: boolean; // Autofocus the field
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Blur handler
  value?: string; // Value of the field
};

const TextField = ({
  required,
  formikRequired,
  type = "text",
  className = "",
  name,
  placeholder = "",
  label,
  isNotFormik,
  onChange,
  readOnly = false,
  disabled = false,
  autoFocus = false,
  onBlur,
  value,
}: TextFieldProps) => {
  return (
    <div className="common-textfield-wrapper">
      {label && (
        <label htmlFor={label} className="form-label">
          {label}
          {required && <strong className="text-danger">*</strong>}
        </label>
      )}
      <Field
        type={type}
        id={label}
        name={name}
        placeholder={placeholder}
        className={`form-control ${formikRequired ? "required-field" : ""} ${className}`}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        disabled={disabled}
        autoFocus={autoFocus}
        value={value}
      />
      {name === "notes" && (
        <i className="text-danger">*Note: Every note should be separated with a period (.)</i>
      )}
      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
    </div>
  );
};

export default TextField;
