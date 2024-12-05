import React, { useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { renderPasswordField, renderTextField } from "../../components/TextFields/customField"; 
import Button from "../../components/Buttons/Button";

const Login = () => {
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required").trim(),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log("Form Data", values);
  };

  return (
    <div className="container mt-0">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik: FormikProps<typeof initialValues>) => (
          <Form>
            {renderTextField({
              formik,
              colWidth: "col-12",
              name: "username",
              type: "text",
              label: "Username",
              required: true,
            })}
            {renderPasswordField({
              formik,
              colWidth: "12",
              name: "password",
              type: passwordType,
              label: "Password",
              required: true,
              setType: setPasswordType
            })}
          
            <Button label="Login" btnType="submit" />
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account? <strong>Register</strong>
      </p>
    </div>
  );
};

export default Login;