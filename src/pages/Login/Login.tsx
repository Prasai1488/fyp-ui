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
    notes: Yup.string(),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log("Form Data", values);
  };

  return (
    <div className="container mt-5">
      <h1>Formik TextField Example</h1>
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
            name="notes"
            label="Notes"
            placeholder="Enter notes here"
            type="text"
          />
          <Button label="Default Button" btnType="submit" />
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
