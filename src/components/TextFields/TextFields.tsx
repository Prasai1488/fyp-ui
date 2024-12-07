import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import "./textField.css";


type TextFieldProps = {
  required?: boolean;
  formikRequired?: boolean;
  type: string;
  className?: string;
  name: string;
  placeholder?: string;
  label?: string;
  isNotFormik?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
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
        className={`form-control ${
          formikRequired ? "required-field" : ""
        } ${className}`}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        disabled={disabled}
        autoFocus={autoFocus}
        value={value}
      />
      
      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
    </div>
  );
};


export default TextField;
