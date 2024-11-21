import React from "react";
import "./TextError.css"; // Optional CSS for styling the error message

type TextErrorProps = {
  children?: React.ReactNode; // Error message content
};

const TextError = ({ children }: TextErrorProps) => {
  return <div className="text-error">{children}</div>;
};

export default TextError;
