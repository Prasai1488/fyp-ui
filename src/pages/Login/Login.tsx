import React from "react";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { renderTextField } from "../../components/TextFields/customField"; 
import Button from "../../components/Buttons/Button";

const Login = () => {
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
            {renderTextField({
              formik,
              colWidth: "col-12",
              name: "password",
              type: "password",
              label: "Password",
              required: true,
            })}
            <Button label="Login" btnType="submit" />
          </Form>
        )}
      </Formik>
      <p>
        Don’t have an account? <strong>Register</strong>
      </p>
    </div>
  );
};

export default Login;
