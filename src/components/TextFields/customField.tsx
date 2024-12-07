import React from "react";
import TextField from "./TextFields";
import { FormikProps } from "formik";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "./textField.css";

type RenderTextFieldProps<T> = {
  formik: FormikProps<T>;
  colWidth: string | number; // Can be 'col' or a number like '6', '12', etc.
  name: string;
  type?: string; // Defaulting type to optional
  label?: string; // Label is optional
  required?: boolean; // Required field indication
  readOnly?: boolean; // Read-only state
};

const togglePassword = (
  type: "password" | "text",
  setType: React.Dispatch<React.SetStateAction<"password" | "text">>
) => {
  if (type === "password") {
    setType("text");
  } else {
    setType("password");
  }
};

export const renderTextField = <T,>({
  formik,
  colWidth,
  name,
  type = "text",
  label = "",
  required = false,
  readOnly = false,
}: RenderTextFieldProps<T>) => {
  const formikError = formik.errors[name as keyof T];
  const formikTouched = formik.touched[name as keyof T];

  return (
    <div className={colWidth === "col" ? "col" : `col-${colWidth}`} key={name}>
      <div className="my-1">
        <TextField
          type={type}
          name={name}
          label={label}
          required={required}
          formikRequired={!!(formikError && formikTouched)} // Mark as required based on Formik state
          onChange={(e) => formik.setFieldValue(name, e.target.value)} // Update Formik value
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export const renderPasswordField = <T,>({
  formik,
  colWidth,
  name,
  type = "password",
  label = "",
  required = false,
  // Use the specifically typed setState
  setType,
}: RenderTextFieldProps<T> & {
  type?: "password" | "text";
  setType: React.Dispatch<React.SetStateAction<"password" | "text">>;
}) => {
  const formikError = formik.errors[name as keyof T];
  const formikTouched = formik.touched[name as keyof T];

  return (
    <div className={`col-${colWidth} password-field-inside`} key={name}>
      <div className="my-1">
        <TextField
          className=""
          type={type}
          name={name}
          label={label}
          required={required}
          formikRequired={!!(formikError && formikTouched)}
          placeholder={label}
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
        />
      </div>
      <span
        className="fa-eye-button"
        onClick={() => togglePassword(type, setType)}
      >
        {type === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
      </span>
    </div>
  );
};
