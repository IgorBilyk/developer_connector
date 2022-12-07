import React from "react";
import { useSelector } from "react-redux";

import "../../App.css";
import { IndividualAlert } from "./IndividualAlert";


const Alert = () => {
  const errors = useSelector((state) => state.register.errorMessages);



  return (
    <div className="alert-container">
      {errors[0]?.errors
        ? errors[0].errors.map((error) => (
            <IndividualAlert key={error.msg} msg={error.msg} />
          ))
        : ""}
    </div>
  );
};
export default Alert;
