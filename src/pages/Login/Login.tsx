import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/TextFields/TextFields";
import Button from "../../components/Buttons/Button";

const Login = () => {
  const initialValues = {
    username: "",
    notes: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("password is required"),
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
        <Form>
          <TextField
            name="username"
            label="Username"
            placeholder="Enter your username"
            required
            formikRequired
          />
          <TextField
            name="password"
            label="Password"
            placeholder="Enter your password here"
            required
            formikRequired
          />
          <Button label="Login" btnType="submit" />
        </Form>
      </Formik>
      <p>
        Dont have an account? <strong>register</strong>
      </p>
    </div>
  );
};

export default Login;
