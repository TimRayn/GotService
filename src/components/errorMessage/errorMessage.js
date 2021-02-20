import React from "react";
import "./errorMessage.css";
import img from "./error.gif";

const ErrorMessage = () => {
  return (
    <>
      <img src={img} alt="error" />
      <span>Oops, something goes wrong...</span>
    </>
  );
};

export default ErrorMessage;