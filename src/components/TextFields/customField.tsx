import React from "react";
import TextField from "./TextFields";
import { FormikProps } from "formik";

type RenderTextFieldProps<T> = {
  formik: FormikProps<T>;
  colWidth: string | number; // Can be 'col' or a number like '6', '12', etc.
  name: string;
  type?: string; // Defaulting type to optional
  label?: string; // Label is optional
  required?: boolean; // Required field indication
  readOnly?: boolean; // Read-only state
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
